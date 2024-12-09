---
sidebar_position: 6
---

# Version Control

## Overview

We're managing Devs and Dragons using **Git** and **GitHub**. 

Our git repository combines three distinct parts of our project:
- Docusaurus Documentation.
- Flask Web Server (MongoDB).
- Core user interface using React.

## Branching 

- Branches are created based on the latest **main** branch commit.

## Branch Protection

- We require a pull request before merging into main.



## Docusaurus Build

We use **GitHub Actions** on our **main** branch to build our Docusaurus project documentation dynamically. Docusaurus uses the text and configuration details from Markdown and JSON files to build an HTML-based documentation website.
