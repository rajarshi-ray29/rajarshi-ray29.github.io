---
title: "Accord Global Technology Solutions (ALTEN), Artificial Intelligence Intern"
excerpt: |
  - Trained a **ship-detection** model for the Indian Navy using synthetic images generated from a **3D model**.  
  - Developed proficiency in **YOLOv5** and **3D modeling** workflows with **Blender** for dataset creation.  
  - Improved model performance via **iterative training, fine-tuning, and data preprocessing**.  
  <br/><img src='/images/accord_logo.png' width="500" height="300">
collection: experience
---

Accord Global Technology Solutions (ALTEN), Bengaluru, KA, India
======
**Role:** Artificial Intelligence Intern  
**Timeline:** June 2023 – August 2023 · On-site

Top Highlights
------
- Built a synthetic-data pipeline from a **3D ship model** to generate diverse renderings (views, lighting, backgrounds) and exported labels in **YOLO format**.  
- Trained and fine-tuned **YOLOv5** for **maritime object detection**; improved precision/recall vs. initial baseline by iterating on augmentations and hyperparameters.  
- Streamlined **preprocessing** and dataset curation to reduce noise and class imbalance, enabling more stable training and evaluation.

Overview
======
Worked on a **sim-to-real** workflow for maritime surveillance: generating synthetic images from 3D assets, curating datasets, and training a robust detector for ship identification. Emphasis on bridging domain gap through **domain randomization**, data quality checks, and careful evaluation on held-out sets.

Key Projects
------
- **Synthetic Data Generation (Blender)**  
  Scripted renders from a **3D ship model** across varied camera angles, backgrounds, and lighting; exported **bounding boxes** compatible with YOLO.  
  *Result:* Scalable dataset creation without sensitive operational data.

- **YOLOv5 Training & Tuning**  
  Set up training loops, managed augmentations (resize/flip/color), ran **anchor auto-fit**, and tuned learning rate, batch size, and image size.  
  *Result:* Higher detection accuracy with fewer false positives on validation.

- **Preprocessing & Evaluation**  
  Implemented **data cleaning**, split logic, and standardized evaluation; tracked metrics and failure cases to guide further iterations.  
  *Result:* Reproducible experiments and clearer model comparison.

What I Owned
------
- End-to-end **dataset pipeline** (synthetic generation → labeling → splits).  
- **Model training** and hyperparameter tuning with YOLOv5.  
- **Evaluation & reporting** with curated metrics, error analysis, and visualizations.  
- Collaboration with mentors on requirements and validation scenarios.

Tech Stack
------
**YOLOv5 (PyTorch)**, **Python**, **OpenCV**, **Blender**, **NumPy/Pandas**, **Git**, **Linux**

Impact
------
- Produced a **reproducible workflow** for ship detection using synthetic data.  
- Improved model quality through disciplined **tuning and preprocessing**.  
- Delivered documentation and scripts that enabled **faster future iterations**.
