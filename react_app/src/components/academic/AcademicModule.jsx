import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import SchoolSelector from './SchoolSelector';
import AcademicExamView from './AcademicExamView';
import DashboardEstrategico from './DashboardEstrategico';

export default function AcademicModule() {
  const {
    academicSchool,
    academicStep,
    academicResults,
    setAcademicSchool,
    setAcademicStep,
    completeAcademicExam
  } = useAssessmentStore();

  // Iniciar examen para una escuela
  const handleSelectSchool = (schoolId) => {
    setAcademicSchool(schoolId);
    setAcademicStep('exam');
  };

  // Finalizar examen y desplegar el Dashboard Estratégico
  const handleExamComplete = (results) => {
    completeAcademicExam(results);
  };

  // Volver al catálogo de escuelas
  const handleBackToCatalog = () => {
    setAcademicStep('catalog');
  };

  // Repetir el examen para la misma escuela
  const handleRestartExam = () => {
    setAcademicStep('exam');
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {academicStep === 'catalog' && (
          <motion.div
            key="academic-catalog"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <SchoolSelector onSelectSchool={handleSelectSchool} />
          </motion.div>
        )}

        {academicStep === 'exam' && (
          <motion.div
            key={`academic-exam-${academicSchool}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <AcademicExamView
              schoolId={academicSchool}
              onComplete={handleExamComplete}
              onCancel={handleBackToCatalog}
            />
          </motion.div>
        )}

        {academicStep === 'strategy' && (
          <motion.div
            key="academic-strategy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DashboardEstrategico
              results={academicResults}
              onRestart={handleRestartExam}
              onSelectOtherSchool={handleBackToCatalog}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
