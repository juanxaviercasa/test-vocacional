import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generador de Informe Clasificado en Formato PDF
 * Utiliza html2canvas para rasterizar con alta fidelidad gráfica (scale: 2)
 * y jsPDF para compilar el documento militar oficial multipágina o póster táctico.
 */
export async function generateTacticalPDF(elementId, candidateName = 'POSTULANTE', dni = '00000000') {
  const targetElement = document.getElementById(elementId);
  if (!targetElement) {
    console.error(`Elemento #${elementId} no encontrado para generar PDF.`);
    alert('No se pudo encontrar la sección del reporte para la generación del documento.');
    return false;
  }

  // Desactivar temporalmente transiciones de CSS para captura limpia
  const originalTransition = targetElement.style.transition;
  targetElement.style.transition = 'none';

  try {
    // Configuración optimizada de html2canvas para dark mode y gráficos SVG
    const canvas = await html2canvas(targetElement, {
      scale: 2, // 2x DPI para nitidez tipográfica impecable
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#0B101E', // Fondo oficial Azul Noche táctico
      logging: false,
      windowWidth: 1280,
      onclone: (clonedDoc) => {
        // Asegurar que elementos no deseados en impresión estén ocultos en el clon
        const noPrintElements = clonedDoc.querySelectorAll('.no-print');
        noPrintElements.forEach((el) => {
          el.style.display = 'none';
        });

        // Asegurar fondo oscuro en el contenedor clonado
        const clonedTarget = clonedDoc.getElementById(elementId);
        if (clonedTarget) {
          clonedTarget.style.backgroundColor = '#0B101E';
          clonedTarget.style.padding = '24px';
          clonedTarget.style.borderRadius = '0px';
        }
      }
    });

    targetElement.style.transition = originalTransition;

    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    // Dimensiones en formato A4 vertical (210mm x 297mm)
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth - 10; // 5mm margen a cada lado
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 5; // margen superior

    // Primera página
    pdf.addImage(imgData, 'JPEG', 5, position, imgWidth, imgHeight, '', 'FAST');
    heightLeft -= (pdfHeight - 10);

    // Páginas adicionales si el reporte es largo
    while (heightLeft > 0) {
      position = heightLeft - imgHeight + 5;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 5, position, imgWidth, imgHeight, '', 'FAST');
      heightLeft -= (pdfHeight - 10);
    }

    // Metadatos de seguridad del documento PDF
    const cleanDNI = String(dni).trim() || 'PERU';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `INFORME_CLASIFICADO_FFAA_PNP_${cleanDNI}_${timestamp.slice(0, 10)}.pdf`;

    pdf.setProperties({
      title: `Informe Vocacional Clasificado - ${candidateName}`,
      subject: 'Evaluación Psicométrica, Biométrica y de Intereses Operacionales FFAA & PNP',
      author: 'Comando Conjunto de Admisión - Protocolo MIL-STD-2026',
      keywords: 'FFAA, PNP, Admisión, EMCH, EOFAP, ENP, EO-PNP, Vocacional',
      creator: 'Sistema Táctico Zenit'
    });

    // Descarga automática en el navegador
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error durante la generación del PDF clasificado:', error);
    targetElement.style.transition = originalTransition;
    throw error;
  }
}
