# EU Cloud Sovereignty Assessment Tool

A comprehensive assessment tool for evaluating cloud services and infrastructure against the **European Commission's Cloud Sovereignty Framework (v1.2.1, October 2025)**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![EU Framework](https://img.shields.io/badge/EU_Framework-v1.2.1-blue.svg)](https://commission.europa.eu/document/download/09579818-64a6-4dd5-9577-446ab6219113_en)
[![GitHub Pages](https://img.shields.io/badge/Web_App-Live-brightgreen.svg)](https://flavienbwk.github.io/cloud-sovereignty-score/)

## Overview

This web-based tool helps organizations assess their cloud infrastructure's compliance with EU sovereignty requirements through an interactive questionnaire covering 8 key sovereignty objectives. It generates a comprehensive **SEAL (Sovereign European Assurance Level)** score and provides actionable recommendations for improvement.

### What is Cloud Sovereignty?

Cloud sovereignty refers to the ability of organizations and governments to maintain control over their data, infrastructure, and digital operations within their legal and jurisdictional boundaries. The EU Cloud Sovereignty Framework establishes criteria for assessing and ensuring that cloud services align with European values, laws, and strategic interests.

## Features

- **Web-Based Interface** - Modern, responsive web application for easy assessment
- **54 Comprehensive Questions** - Covering all 8 sovereignty objectives
- **Weighted Scoring System** - Aligned with official EU framework weights (1000 points total)
- **SEAL Level Classification** - 5-tier rating system (SEAL 1-5)
- **Personalized Recommendations** - Targeted advice for improving sovereignty posture
- **Automated Reporting** - Timestamped assessment reports in text format
- **Framework Compliant** - Based on EU Cloud Sovereignty Framework v1.2.1

## The 8 Sovereignty Objectives

| Objective                                    | Weight | Points | Description                                          |
| -------------------------------------------- | ------ | ------ | ---------------------------------------------------- |
| **SOV-1** Strategic Sovereignty              | 15%    | 150    | Corporate control, governance, and EU independence   |
| **SOV-2** Legal & Jurisdictional Sovereignty | 10%    | 100    | Legal protection, GDPR compliance, EU jurisdiction   |
| **SOV-3** Data & AI Sovereignty              | 10%    | 100    | Data location, processing control, encryption        |
| **SOV-4** Operational Sovereignty            | 15%    | 150    | Personnel control, access management, operations     |
| **SOV-5** Supply Chain Sovereignty           | 20%    | 200    | Hardware sourcing, vendor transparency, dependencies |
| **SOV-6** Technology Sovereignty             | 15%    | 150    | Open standards, interoperability, vendor lock-in     |
| **SOV-7** Security & Compliance Sovereignty  | 10%    | 100    | Certifications, cybersecurity, incident response     |
| **SOV-8** Environmental Sustainability       | 5%     | 50     | Renewable energy, carbon neutrality, Green Deal      |

> **Note**: Supply Chain Sovereignty (SOV-5) carries the highest weight at 20%, reflecting its critical importance in the framework.

## SEAL Levels

The tool assigns one of five Sovereign European Assurance Levels based on your total score:

| Level      | Score Range            | Description                                                    |
| ---------- | ---------------------- | -------------------------------------------------------------- |
| **SEAL 5** | 90-100% (900-1000 pts) | Maximum Sovereignty - Highest level of compliance              |
| **SEAL 4** | 75-89% (750-899 pts)   | High Sovereignty - Strong compliance with minimal dependencies |
| **SEAL 3** | 60-74% (600-749 pts)   | Moderate Sovereignty - Adequate for many use cases             |
| **SEAL 2** | 40-59% (400-599 pts)   | Limited Sovereignty - Basic measures in place                  |
| **SEAL 1** | 0-39% (0-399 pts)      | Minimal Sovereignty - Significant gaps exist                   |

## Quick Start

Access the online assessment tool:

**[Launch Web Assessment Tool](https://flavienbwk.github.io/cloud-sovereignty-score/)**

No installation required - works in any modern web browser!

## How to Use

1. Visit the [web assessment tool](https://flavienbwk.github.io/cloud-sovereignty-score/)
2. Click "Begin Assessment"
3. Answer all 54 questions across 8 sovereignty objectives
4. Review your SEAL rating and detailed score breakdown
5. Download your assessment report

### Assessment Duration

- **Estimated time**: 10-15 minutes
- **Total questions**: 54
- **Question types**: Multiple choice and Yes/No/Partial

## Report Files

Each assessment generates a downloadable timestamped report with:

- Assessment date and timestamp
- Full score breakdown by objective
- Total score and SEAL level
- Personalized recommendations
- Reference to framework version

## Use Cases

### For Organizations

- **Cloud Migration Planning** - Assess sovereignty implications before migrating to cloud providers
- **Vendor Selection** - Evaluate potential cloud vendors against EU sovereignty standards
- **Compliance Audits** - Document sovereignty compliance for regulators and stakeholders
- **Risk Assessment** - Identify sovereignty gaps and vulnerabilities
- **Procurement Requirements** - Generate requirements for RFPs and vendor contracts

### For Cloud Service Providers

- **Self-Assessment** - Evaluate your service's sovereignty posture
- **Competitive Positioning** - Demonstrate sovereignty compliance to EU customers
- **Service Improvement** - Identify areas for enhancing sovereignty features
- **Marketing Materials** - Generate objective sovereignty scores for customer communications

### For Public Sector

- **Policy Compliance** - Ensure adherence to EU digital sovereignty policies
- **Procurement Decisions** - Make informed decisions for government cloud services
- **Strategic Planning** - Align IT infrastructure with national sovereignty goals

## Customization

The tool uses a data-driven approach with all questions defined in `questions.js`. To customize:

### Adding or Modifying Questions

Edit `questions.js` to add new questions or modify existing ones. Each question follows this structure:

```javascript
{
    id: "q1.7",
    text: "Your question text here?",
    type: "yes_no",  // or "multiple_choice"
    multiplier: 1
}
```

### Adjusting SEAL Thresholds

Modify the `getSEALLevel()` function in `app.js` to adjust threshold percentages.

## Best Practices

### Before Assessment

- **Gather Documentation** - Collect information about infrastructure, vendors, and policies
- **Involve Key Stakeholders** - Include legal, IT, security, and procurement teams
- **Review Contracts** - Have cloud service agreements and SLAs available
- **Understand Architecture** - Document data flows, processing locations, and dependencies

### During Assessment

- **Be Honest** - Accurate responses yield actionable results
- **Use Partial** - Select "Partial" if implementation is in progress
- **Document Uncertainty** - Note questions where information is incomplete
- **Take Your Time** - Don't rush through complex questions

### After Assessment

- **Review Recommendations** - Prioritize improvements based on weight and gaps
- **Create Action Plan** - Develop roadmap for improving sovereignty posture
- **Reassess Regularly** - Run assessment quarterly or after major changes
- **Track Progress** - Compare scores over time to measure improvement

## Framework Reference

This tool is based on the official **EU Cloud Sovereignty Framework v1.2.1** (October 2025) published by the European Commission.

### Official Documentation

- [Cloud Sovereignty Framework (PDF)](https://commission.europa.eu/document/download/09579818-64a6-4dd5-9577-446ab6219113_en)
- [Interoperable Europe Portal](https://interoperable-europe.ec.europa.eu/collection/eprocurement/news/cloud-sovereignty-framework)
- [EU Digital Strategy](https://digital-strategy.ec.europa.eu/)

### Related EU Regulations

- **GDPR** - General Data Protection Regulation
- **NIS2 Directive** - Network and Information Security
- **Cyber Resilience Act** - Cybersecurity requirements for digital products
- **Data Governance Act** - Framework for data sharing and reuse
- **EU Green Deal** - Environmental sustainability objectives

## Roadmap

### Planned Features

- [ ] JSON/CSV export for reports
- [ ] Multi-language support (FR, DE, ES, IT)
- [ ] Integration with cloud provider APIs for automated data collection
- [ ] Benchmark comparison against industry standards
- [ ] PDF report generation with charts
- [ ] API for programmatic access
- [ ] Docker container version
- [ ] Save and resume assessments
- [ ] Comparison of multiple assessments over time

### Version History

- **v2.1.0** (Current) - Web-based interface with GitHub Pages deployment
- **v2.0.0** - YAML-based configuration system for easy question management
- **v1.0.0** - Initial release with all 8 sovereignty objectives

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-assessment-criteria`)
3. Commit your changes (`git commit -m 'Add new sovereignty criteria'`)
4. Push to the branch (`git push origin feature/new-assessment-criteria`)
5. Open a Pull Request

### Areas for Contribution

- Additional questions for existing objectives
- Translations to EU languages
- Output format improvements
- Integration with monitoring tools
- Documentation enhancements

## Security Considerations

### Data Privacy

- **No Data Transmission** - All assessment data stays local
- **No Internet Required** - Tool works completely offline
- **No Logging** - Responses are not logged or transmitted
- **File Permissions** - Report files are created with user-only read permissions

### Secure Usage

- Review generated reports before sharing with external parties
- Redact sensitive information from reports if needed
- Store reports in secure, encrypted locations
- Regularly delete old assessment reports

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This tool is provided for informational and self-assessment purposes only. It does not constitute:

- Legal advice or compliance certification
- Official EU endorsement or certification
- Guarantee of regulatory compliance
- Substitute for professional legal or technical consultation

Organizations should consult with legal and technical experts for official compliance verification.

## Support

### Getting Help

- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/flavienbwk/cloud-sovereignty-score/issues)
- **Discussions**: Join community discussions in [GitHub Discussions](https://github.com/flavienbwk/cloud-sovereignty-score/discussions)

## Acknowledgments

- European Commission for the Cloud Sovereignty Framework
- Contributors to EU digital sovereignty initiatives
- Open source community for tools and libraries

For questions, suggestions, or collaboration opportunities, please open an issue or reach out to the maintainers.

---

## Quick Reference Card

```txt
╔══════════════════════════════════════════════════════════╗
║            SOVEREIGNTY SCORE QUICK REFERENCE             ║
╠══════════════════════════════════════════════════════════╣
║ Total Points:  1000                                      ║
║ Questions:     54                                        ║
║ Duration:      10-15 minutes                             ║
╟──────────────────────────────────────────────────────────╢
║ TOP PRIORITIES (by weight):                              ║
║ 1. Supply Chain (20%) - Hardware & vendor transparency   ║
║ 2. Strategic (15%) - Corporate control & governance      ║
║ 3. Operational (15%) - Personnel & access control        ║
║ 4. Technology (15%) - Open standards & interoperability  ║
╟──────────────────────────────────────────────────────────╢
║ TARGET SEAL LEVELS:                                      ║
║ • Public Sector:  SEAL 4-5 (750+ points)                 ║
║ • Critical Infrastructure: SEAL 4-5 (750+ points)        ║
║ • Financial Services: SEAL 3-4 (600+ points)             ║
║ • General Business: SEAL 2-3 (400+ points)               ║
╚══════════════════════════════════════════════════════════╝
```
