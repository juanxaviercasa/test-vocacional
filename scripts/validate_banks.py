# -*- coding: utf-8 -*-
import json
import glob
import os

files = glob.glob('banco_preguntas/*_*.json')
individual_files = [f for f in files if 'banco_maestro' not in f]
print(f"Total individual bank files: {len(individual_files)}")

total_q = 0
for fpath in individual_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    assert len(data) == 12, f"{fpath} does not have 12 questions"
    for q in data:
        qid = q["id_pregunta"]
        assert len(q["opciones"]) == 5, f"Question {qid} does not have 5 options"
        correct_count = sum(1 for opt in q["opciones"] if opt["es_correcta"])
        assert correct_count == 1, f"Question {qid} does not have exactly 1 correct option"
        assert q["nivel_dificultad"] in [1, 2, 3], f"Invalid difficulty in {qid}"
        total_q += 1

print(f"ALL {total_q} QUESTIONS VALIDATED 100% SUCCESFULLY!")

# Check markdown files
md_files = sorted(glob.glob('bases_conocimiento/0*.md'))
print(f"Total markdown base files: {len(md_files)}")
for mf in md_files:
    with open(mf, 'r', encoding='utf-8') as f:
        c = f.read()
    bancos = c.count('## 📚 Banco de Preguntas Calibradas')
    print(f"{os.path.basename(mf)}: {bancos} bloques de bancos incorporados")
