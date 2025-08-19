---
title: "NTIRE 2025 Image Super-Resolution (×4) Challenge Report"
collection: publications
category: manuscripts
permalink: /publication/2025-06-20-ntire2025-sr-challenge
excerpt: 'This paper presents the results of the NTIRE 2025 Super-Resolution (×4) Challenge, including Team VAI-GM’s MDRCT approach which achieved competitive performance using a novel multi-step dense residual connected transformer design.'
date: 2025-06-20
venue: 'CVPR 2025 Workshops (NTIRE)'
paperurl: 'https://openaccess.thecvf.com/content/CVPR2025W/NTIRE/supplemental/Chen_NTIRE_2025_Challenge_CVPRW_2025_supplemental.pdf'
citation: 'Chen, Z., Ray, R., Tomar, S.S., Mueller, K., et al. (2025). "NTIRE 2025 Image Super-Resolution (×4) Challenge Report." <i>Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition Workshops (CVPRW)</i>, NTIRE Workshop, 2025.'
image: /images/publications/ntire2025_mdrct.png
---

### About the Paper
The NTIRE 2025 Image Super-Resolution (×4) Challenge was part of the NTIRE Workshop at CVPR 2025.  
It benchmarked state-of-the-art methods for 4× single-image super-resolution, attracting teams worldwide to push the boundaries of image restoration.

<p align="center">
  <img src="/images/publications/ntire2025_mdrct.png" alt="MDRCT Architecture" style="max-width: 800px; width: 100%; height: auto;">
</p>


---

### Our Contribution — Team VAI-GM (Stony Brook University)
As **Team VAI-GM**, we developed the **MDRCT (Multi-step Dense Residual Connected Transformer)**, an enhanced variant of the DRCT architecture.  

**Team Members:**
- **Rajarshi Ray** – Stony Brook University  
- Snehal Singh Tomar – Stony Brook University  
- Prof. Klaus Mueller – Stony Brook University  

**Key Highlights:**
- Introduced **multi-step residual connections** across residual dense groups (RDGs) to improve gradient flow and feature preservation.  
- Used **12 RDG blocks**, inspired by residual learning (ResNet) and hybrid attention transformers, leading to more stable training.  
- Training leveraged **DIV2K (800)** + **Flickr2K (2650)** with validation on **Unsplash2K (20)** images.  
- Optimization with **Adam (lr=5×10⁻⁴)** and **MultiStepLR** scheduling, totaling **250,000 iterations**.  
- Best performance: **30.86 dB PSNR / 0.8942 SSIM** on Unsplash2K validation set; **30.62 dB PSNR** on the official NTIRE test set:contentReference[oaicite:0]{index=0}.  
- Open-sourced code: [GitHub – NTIRE2025_ImageSR_x4_team06](https://github.com/rajarshi-ray29/NTIRE2025_ImageSR_x4_team06).  

---

### Significance
Our MDRCT design pushes forward the DRCT framework by combining traditional residual learning with modern transformer-based strategies.  
The results demonstrate robust generalization and strong performance in a competitive international benchmark.  

---
