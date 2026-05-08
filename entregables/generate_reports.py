from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


OUT_DIR = Path(__file__).resolve().parent


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="ReportTitle",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=26,
            textColor=colors.HexColor("#111111"),
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ReportSubtitle",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            textColor=colors.HexColor("#555555"),
            spaceAfter=14,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Section",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=18,
            textColor=colors.HexColor("#111111"),
            spaceBefore=8,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=10.5,
            leading=15,
            textColor=colors.HexColor("#222222"),
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ReportBullet",
            parent=styles["Body"],
            leftIndent=12,
            bulletIndent=0,
            spaceAfter=4,
        )
    )
    return styles


def bullet(story, styles, text):
    story.append(Paragraph(text, styles["ReportBullet"], bulletText="•"))


def make_client_report(path: Path, styles):
    doc = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title="Informe Comercial - Sitio Web Ateneo de Montevideo",
        author="Equipo de desarrollo",
    )
    story = []

    story.append(Paragraph("Informe Comercial del Producto Web", styles["ReportTitle"]))
    story.append(
        Paragraph(
            "Proyecto: Ateneo de Montevideo | Objetivo: presentar valor estratégico, diseño y capacidad técnica para adjudicación de presupuesto.",
            styles["ReportSubtitle"],
        )
    )

    story.append(Paragraph("1. Visión del producto", styles["Section"]))
    story.append(
        Paragraph(
            "La plataforma fue diseñada como una experiencia editorial-cultural de alto nivel, con estética institucional, navegación clara y arquitectura preparada para crecimiento. "
            "No es una web estática: es un activo de posicionamiento, captación y gestión de audiencias.",
            styles["Body"],
        )
    )

    story.append(Paragraph("2. Qué incluye hoy la web", styles["Section"]))
    for item in [
        "Home optimizado: presenta identidad, oferta académica, salas, historia, visita y contenido audiovisual sin saturación visual.",
        "Sección de cursos con búsqueda y filtrado por categoría, más páginas de detalle por curso.",
        "Sección de salas con fichas individuales de valor histórico y cultural.",
        "Sección de historia con narrativa institucional y galería.",
        "Landing de Exposiciones/Eventos con agenda editorial y programación destacada.",
        "Landing de Investigación/Educación con listado de artículos y páginas de lectura individual.",
        "Sección de contacto y visita con datos operativos, accesibles y directos.",
    ]:
        bullet(story, styles, item)

    story.append(Paragraph("3. En qué pensamos al crearla", styles["Section"]))
    for item in [
        "Reputación institucional: diseño sobrio, jerarquía tipográfica fuerte, lenguaje visual contemporáneo.",
        "Conversión: CTAs claros para consulta, inscripción y reserva de actividades.",
        "Usabilidad real: navegación consistente desktop/mobile y reducción de fricción en recorridos clave.",
        "Escalabilidad editorial: estructura preparada para ampliar contenidos, campañas y eventos.",
        "Performance y SEO base: metadatos, estructura semántica y carga visual cuidada.",
    ]:
        bullet(story, styles, item)

    story.append(Paragraph("4. Valor para negocio y marca", styles["Section"]))
    metrics_table = Table(
        [
            ["Eje", "Impacto esperado"],
            ["Posicionamiento", "Mayor percepción de calidad institucional y modernidad."],
            ["Captación", "Más consultas desde cursos, eventos y contacto."],
            ["Retención", "Mayor tiempo en sitio por contenido editorial profundo."],
            ["Escalabilidad", "Base técnica apta para nuevas campañas y secciones."],
        ],
        colWidths=[52 * mm, 108 * mm],
    )
    metrics_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#efefef")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#111111")),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 9.5),
                ("LINEBELOW", (0, 0), (-1, 0), 0.8, colors.HexColor("#d0d0d0")),
                ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#dddddd")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    story.append(metrics_table)
    story.append(Spacer(1, 8))

    story.append(Paragraph("5. Resumen para propuesta comercial", styles["Section"]))
    story.append(
        Paragraph(
            "Este producto combina diseño premium, identidad institucional y una base técnica sólida. "
            "Se entrega como plataforma viva, lista para operar y crecer en contenidos, campañas y programas culturales. "
            "La inversión no se limita a “una web”: construye presencia pública, autoridad cultural y un canal digital sostenible para la institución.",
            styles["Body"],
        )
    )

    doc.build(story)


def make_internal_report(path: Path, styles):
    doc = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title="Informe Interno y Roadmap - Sitio Web Ateneo de Montevideo",
        author="Equipo de desarrollo",
    )
    story = []

    story.append(Paragraph("Informe Interno Técnico + Roadmap", styles["ReportTitle"]))
    story.append(
        Paragraph(
            "Objetivo: consolidar lo implementado, documentar estado actual y priorizar mejoras para evolución de producto.",
            styles["ReportSubtitle"],
        )
    )

    story.append(Paragraph("1. Trabajo realizado", styles["Section"]))
    for item in [
        "Refactor de navegación principal y mobile menu (overlay, cierre por ruta, bloqueo de scroll de fondo).",
        "Corrección de salto visual en navegación entre secciones (scroll behavior y transición de ruta).",
        "Creación de landings Exposiciones/Eventos e Investigación/Educación.",
        "Creación de páginas de detalle para artículos con URL dinámica y metadatos editoriales.",
        "Ajustes de home: mejor densidad de contenido, menos ruido visual y rutas claras hacia secciones clave.",
        "Mejoras UI: color en imágenes de inicio, back links sutiles y coherencia visual en landings.",
        "Corrección de error de runtime por mapeo de slug + fallback defensivo para evitar crash futuro.",
    ]:
        bullet(story, styles, item)

    story.append(Paragraph("2. Estado de calidad", styles["Section"]))
    for item in [
        "Build de Vite y TypeScript verificados durante iteraciones previas.",
        "Estructura de rutas estable y navegación funcional en desktop/mobile.",
        "Base semántica y SEO on-page presentes (title, description, canonical, OG, structured data).",
    ]:
        bullet(story, styles, item)

    story.append(Paragraph("3. Auditoría de seguridad y buenas prácticas", styles["Section"]))
    story.append(
        Paragraph(
            "Se inició hardening de dependencias con upgrades y overrides (react-router, lodash, postcss, minimatch, etc.). "
            "Se redujeron algunos riesgos, pero persisten vulnerabilidades transitivas en la cadena de tooling CSS/JS. "
            "Recomendación: completar actualización de toolchain y lockfile en una sesión dedicada de saneamiento.",
            styles["Body"],
        )
    )

    story.append(Paragraph("4. Roadmap propuesto (90 días)", styles["Section"]))
    phases = [
        (
            "Fase 1 (Semanas 1-2) - Estabilidad y seguridad",
            [
                "Cerrar vulnerabilidades high/moderate con upgrade de stack y lockfile limpio.",
                "Aplicar headers de seguridad en entorno de deploy (CSP, Referrer-Policy, Permissions-Policy, etc.).",
                "Añadir pipeline CI: lint + typecheck + build + audit baseline.",
            ],
        ),
        (
            "Fase 2 (Semanas 3-6) - Contenido y conversión",
            [
                "Backoffice liviano para artículos/eventos (o integración CMS).",
                "Métricas de conversión por sección (contacto, reservas, formularios).",
                "Optimización de copies y CTAs por objetivo institucional.",
            ],
        ),
        (
            "Fase 3 (Semanas 7-10) - Accesibilidad y performance",
            [
                "Auditoría WCAG 2.2 AA completa con correcciones.",
                "Optimización de imágenes por breakpoints y presupuestos de performance.",
                "Revisión de Core Web Vitals en producción.",
            ],
        ),
        (
            "Fase 4 (Semanas 11-12) - Escala y mantenimiento",
            [
                "Documentación técnica del proyecto y manual operativo.",
                "Calendario de releases y mantenimiento mensual preventivo.",
                "Plan anual de evolución visual/editorial para nuevas campañas.",
            ],
        ),
    ]

    for phase_title, points in phases:
        story.append(Paragraph(phase_title, styles["Body"]))
        for p in points:
            bullet(story, styles, p)
        story.append(Spacer(1, 3))

    story.append(Paragraph("5. Riesgos y mitigación", styles["Section"]))
    risk_table = Table(
        [
            ["Riesgo", "Mitigación"],
            ["Dependencias vulnerables", "Saneamiento de lockfile + actualización de toolchain + revisión mensual."],
            ["Crecimiento de contenido desordenado", "Modelo editorial con taxonomías y flujo de publicación."],
            ["Pérdida de consistencia visual", "Design system ligero y checklist de QA UI."],
            ["Cuellos de botella operativos", "Automatización CI/CD y documentación de procesos."],
        ],
        colWidths=[54 * mm, 106 * mm],
    )
    risk_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#efefef")),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 9.5),
                ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#dddddd")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    story.append(risk_table)

    doc.build(story)


def main():
    styles = build_styles()
    client_pdf = OUT_DIR / "Informe-Cliente-Ateneo.pdf"
    internal_pdf = OUT_DIR / "Informe-Interno-Roadmap-Ateneo.pdf"
    make_client_report(client_pdf, styles)
    make_internal_report(internal_pdf, styles)
    print(client_pdf)
    print(internal_pdf)


if __name__ == "__main__":
    main()
