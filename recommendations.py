"""
Información educativa por clase para el dataset HAM10000.

⚠️ IMPORTANTE: Este contenido es ÚNICAMENTE EDUCATIVO, para un proyecto
académico (PFAD-PADCC-VIC04 - TecNM Virtual). NO sustituye una consulta
médica ni constituye un diagnóstico. El texto de cada clase incluye
siempre una recomendación de acudir con un dermatólogo.
"""

INFO_CLASES = {
    "melanoma": {
        "nombre_display": "Melanoma",
        "categoria": "Maligno",
        "nivel_riesgo": "alto",
        "color": "#e74c3c",
        "descripcion": (
            "El melanoma es el tipo más grave de cáncer de piel. Se origina en "
            "los melanocitos, las células que producen melanina (el pigmento de "
            "la piel). Puede aparecer como un lunar nuevo o como un cambio en uno "
            "ya existente: bordes irregulares, varios colores en la misma lesión, "
            "asimetría o crecimiento rápido."
        ),
        "que_observar": [
            "Asimetría: una mitad de la lesión no es igual a la otra",
            "Bordes irregulares, dentados o difusos",
            "Color no uniforme (mezcla de marrón, negro, rojizo o azulado)",
            "Diámetro mayor a 6 mm",
            "Evolución: cambios en tamaño, forma o color en poco tiempo",
        ],
        "recomendacion": (
            "Este resultado sugiere características asociadas a melanoma. "
            "Es muy importante que acudas con un dermatólogo lo antes posible "
            "para una evaluación profesional con dermatoscopio y, si se "
            "considera necesario, una biopsia. Detectado a tiempo, el "
            "melanoma tiene un pronóstico mucho más favorable."
        ),
    },
    "melanocytic_nevi": {
        "nombre_display": "Nevo melanocítico (lunar común)",
        "categoria": "Benigno",
        "nivel_riesgo": "bajo",
        "color": "#27ae60",
        "descripcion": (
            "Los nevos melanocíticos son lo que comúnmente llamamos 'lunares'. "
            "Son acumulaciones benignas de melanocitos, muy frecuentes en la "
            "piel de la mayoría de las personas, generalmente de forma regular, "
            "color uniforme y bordes definidos."
        ),
        "que_observar": [
            "Forma generalmente redonda u ovalada y simétrica",
            "Color uniforme (marrón claro a oscuro)",
            "Bordes bien definidos",
            "Tamaño estable a lo largo del tiempo",
        ],
        "recomendacion": (
            "Este resultado sugiere un lunar de aspecto benigno. Aun así, es "
            "buena práctica revisar tus lunares periódicamente (autoexamen "
            "mensual) y consultar a un dermatólogo si notas cualquier cambio "
            "en forma, color, tamaño o si empieza a sangrar o picar."
        ),
    },
    "basal_cell_carcinoma": {
        "nombre_display": "Carcinoma basocelular",
        "categoria": "Maligno",
        "nivel_riesgo": "medio-alto",
        "color": "#e67e22",
        "descripcion": (
            "El carcinoma basocelular es el tipo de cáncer de piel más común. "
            "Suele crecer lentamente y rara vez se extiende a otras partes del "
            "cuerpo, pero si no se trata puede dañar tejido y estructuras "
            "cercanas. Suele aparecer en zonas expuestas al sol (cara, cuello, "
            "orejas)."
        ),
        "que_observar": [
            "Protuberancia brillante o perlada, a veces con vasos sanguíneos visibles",
            "Lesión plana de color carne o marrón",
            "Llaga que no cicatriza o que sangra fácilmente",
            "Área enrojecida o irritada de forma persistente",
        ],
        "recomendacion": (
            "Este resultado sugiere características asociadas a carcinoma "
            "basocelular. Se recomienda acudir con un dermatólogo para una "
            "valoración. Aunque suele ser de crecimiento lento, el diagnóstico "
            "y tratamiento oportuno (frecuentemente quirúrgico, ambulatorio) "
            "evita complicaciones mayores."
        ),
    },
    "actinic_keratoses": {
        "nombre_display": "Queratosis actínica / Carcinoma intraepitelial",
        "categoria": "Pre-maligno",
        "nivel_riesgo": "medio",
        "color": "#f39c12",
        "descripcion": (
            "Las queratosis actínicas son lesiones causadas por daño solar "
            "acumulado a lo largo de los años. Se consideran 'pre-malignas' "
            "porque una pequeña proporción puede evolucionar a un carcinoma "
            "escamocelular si no se tratan."
        ),
        "que_observar": [
            "Parche áspero, escamoso o costroso",
            "Color rosado, rojizo o marrón sobre piel dañada por el sol",
            "Sensación de aspereza al tacto (como papel de lija)",
            "Aparece típicamente en cara, orejas, cuero cabelludo, manos y antebrazos",
        ],
        "recomendacion": (
            "Este resultado sugiere una lesión con potencial pre-maligno. Se "
            "recomienda acudir con un dermatólogo para valorar tratamiento "
            "(por ejemplo, crioterapia, cremas tópicas o terapia fotodinámica) "
            "y así prevenir su progresión. También se recomienda mejorar la "
            "protección solar (bloqueador, sombreros, evitar exposición en "
            "horas pico)."
        ),
    },
    "benign_keratosis": {
        "nombre_display": "Lesión queratósica benigna",
        "categoria": "Benigno",
        "nivel_riesgo": "bajo",
        "color": "#27ae60",
        "descripcion": (
            "Este grupo incluye lesiones como las queratosis seborreicas, "
            "lentigos solares y queratosis tipo liquen plano. Son crecimientos "
            "benignos muy comunes, sobre todo en personas adultas, asociados "
            "a la edad y a la exposición solar acumulada, sin relación con el "
            "cáncer."
        ),
        "que_observar": [
            "Lesión de aspecto 'pegada' a la piel, como cera o verruga",
            "Color que va de marrón claro a negro",
            "Superficie a veces escamosa o con textura cerosa",
            "Crecimiento muy lento, generalmente sin cambios bruscos",
        ],
        "recomendacion": (
            "Este resultado sugiere una lesión benigna relacionada con la "
            "edad/exposición solar. Generalmente no requiere tratamiento, pero "
            "si te genera molestia estética, roce con la ropa, picazón o "
            "cambia de aspecto, consulta a un dermatólogo para confirmarlo y "
            "valorar opciones de remoción si lo deseas."
        ),
    },
    "dermatofibroma": {
        "nombre_display": "Dermatofibroma",
        "categoria": "Benigno",
        "nivel_riesgo": "bajo",
        "color": "#27ae60",
        "descripcion": (
            "Un dermatofibroma es un nódulo benigno de tejido fibroso que suele "
            "aparecer en las piernas, a veces tras una pequeña lesión o "
            "picadura de insecto. Es firme al tacto y muy común, sin relación "
            "con el cáncer de piel."
        ),
        "que_observar": [
            "Nódulo firme, pequeño (generalmente menor a 1 cm)",
            "Color marrón, rojizo o rosado",
            "Al presionar los lados, suele 'hundirse' hacia adentro (signo del hoyuelo)",
            "Generalmente estable durante años",
        ],
        "recomendacion": (
            "Este resultado sugiere una lesión benigna y muy común. No suele "
            "requerir tratamiento. Si te causa molestia, cambia notablemente "
            "de tamaño/color o te genera dudas, una valoración con "
            "dermatólogo puede confirmarlo y, si lo deseas, valorar su "
            "remoción."
        ),
    },
    "vascular_lesions": {
        "nombre_display": "Lesión vascular",
        "categoria": "Benigno",
        "nivel_riesgo": "bajo",
        "color": "#27ae60",
        "descripcion": (
            "Las lesiones vasculares incluyen angiomas, hemangiomas y "
            "manchas relacionadas con vasos sanguíneos dilatados o "
            "malformaciones vasculares benignas. Son muy frecuentes y, en su "
            "mayoría, no representan ningún riesgo."
        ),
        "que_observar": [
            "Color rojo, morado o azulado",
            "Superficie lisa o ligeramente elevada",
            "Puede palidecer momentáneamente al presionarla",
            "Tamaño generalmente estable",
        ],
        "recomendacion": (
            "Este resultado sugiere una lesión vascular benigna. Por lo "
            "general no requiere tratamiento. Si presenta sangrado "
            "frecuente, crecimiento rápido o cambios de color notorios, "
            "consulta a un dermatólogo para una valoración."
        ),
    },
}


def obtener_info_clase(nombre_clase: str) -> dict:
    """Regresa el diccionario de info para una clase, con fallback genérico."""
    return INFO_CLASES.get(
        nombre_clase,
        {
            "nombre_display": nombre_clase.replace("_", " ").title(),
            "categoria": "Desconocida",
            "nivel_riesgo": "desconocido",
            "color": "#7f8c8d",
            "descripcion": "No hay información disponible para esta clase.",
            "que_observar": [],
            "recomendacion": (
                "Consulta a un dermatólogo para una evaluación profesional."
            ),
        },
    )
