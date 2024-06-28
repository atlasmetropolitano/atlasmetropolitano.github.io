// JavaScript para manejar la selección de miembros del equipo
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const teamInfo = document.querySelector('.team-info'); // Selecciona el contenedor de team-info

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('show');
    });

    const teamMembers = document.querySelectorAll('.team-member');
    const selectedPhoto = document.getElementById('selected-photo');
    const memberName = document.getElementById('member-name');
    const memberRole = document.getElementById('member-role');
    const memberDescription = document.getElementById('member-description');

    // Información de los miembros (puede ser cargada desde un archivo JSON o API)
    const members = [
        {
            name: 'Maria Adela Igarzabal',
            role: 'DIRECTORA <br> Arquitecta y Planificadora Urbana y Regional ',
            photo: 'img/nosotros/Maria_Adela.jpg',
            description: 'Técnico Investigador del Centro de Información Metropolitana de la Facultad de Arquitectura Diseño y Urbanismo, Universidad de Buenos Aires por más de 14 años. Especialista en Sistemas de información Geográfica, normalización y realización de bases de datos. Ha participado en la elaboración de Proyectos UBACyT y Proyectos de la Agencia Nacional de Promoción Científica y Tecnológica y trabajos específicos a terceros, exposiciones; diagramación y diseño de publicaciones.'
        },
        {
            name: 'Patricia Dietrich',
            role: 'COORDINADORA <br> Arquitecta y Especialista en SIG (Sistemas de Información Geográfica)',
            photo: 'img/nosotros/Patricia_dietrich.jpg',
            description: 'Coordinadora y docente. Investigadora del Centro de Información Metropolitana de la Facultad de Arquitectura Diseño y Urbanismo, Universidad de Buenos Aires durante 33 años. Categorizada por la Secretaría de Políticas Universitarias, Ministerio de Cultura Educación. Especialista en Sistemas de Información Geográfica ha participado en la elaboración de Proyectos UBACyT y Proyectos de la Agencia Nacional de Promoción Científica y Tecnológica y trabajos específicos a terceros, exposiciones; diagramación y diseño de publicaciones.'
        },
        {
            name: 'Raquel Ajhuacho Carrión',
            role: 'INVESTIGADORA <br> Arquitecta y Especialista en SIG (Sistemas de Información Geográfica)',
            photo: 'img/nosotros/raquel_carrion.jpg',
            description: 'Egresada de la Facultad de Arquitectura, Diseño y Urbanismo. Investigadora del Centro de Información Metropolitana, Secretaría de Ciencia y Técnica, FADU-UBA. En tal carácter opera con diferentes Softwares específicos en SIG para conformar distintas base de datos. Maneja Imágenes Satelitales, aplicados a la temática urbano-ambiental. Realiza tareas de difusión de los proyectos que se desarrollan en el centro, publicaciones, poster, jornadas, etc. Desarrolla actividad docente en la FADU, en el área de Construcciones. Un fuerte compromiso, con el estudio de la contaminación, construcción sustentable, reutilización de residuos y cuidado del medio ambiente.'
        },
        {
            name: 'Silvia Boglioli',
            role: 'INVESTIGADORA <br> Diseñadora Gráfica',
            photo: 'img/nosotros/Silvia-Boglioli.jpg',
            description: 'Graduada en la Facultad de Arquitectura Diseño y Urbanismo.FADU-U.B.A. Investigadora del Centro de Información Metropolitana FADU-U.B.A.Opera con diferentes Software específicos en SIG. Aplica los Sistemas de Información Geográfica al campo urbano y territorial. Diseños para la difusión de proyectos y ponencias a ser presentados en eventos científicos del CIM y en IDE del CIM Infraestructura de Datos Espaciales FADU-U.B.A. Exposición y colaboración en conferencias, seminarios y talleres. Identidad visual y página Web.'
        },
        {
            name: 'Julio Cesar Benedetti',
            role: 'INVESTIGADORA <br> Doctor en Geografía',
            photo: 'img/nosotros/Julio-Cesar-_Benedetti.jpg',
            description: 'Profesor de Geotecnologías en la Maestría de Planificación Urbana y Regional FADU/ UBA; y en carreras de grado y posgrado de la Universidad del Salvador. Es Ingeniero Geógrafo y Coronel del Ejército Argentino. Diseñó y dirigió el desarrollo del primer SIG oficial de cobertura nacional, SIG250. Como Subdirector del Instituto Geográfico Nacional impulsó y coordinó la Infraestructura de Datos de la República Argentina–IDERA, así como otras iniciativas institucionales como la Revista “El ojo del cóndor”, los Atlas Cartográficos de escalas 1:500.000 de todo el país, y el de Tucumán; la creación de oficinas provinciales de IGN, el Atlas Nacional Interactivo, entre varias acciones. Coordinó el desarrollo del primer SIG de América del Sur, con la participación de organismos oficiales de los 12 países que formaron la UNASUR. Coordina el diseño y desarrollo de la IDE del CIM a partir de su Sistema de Información Territorial, adecuándolo a los estándares nacionales, para asegurar el acceso público e inter operable vía Internet a sus contenidos. Actualmente impulsa la creación de una IDE para FADU.'
        },
        {
            name: 'Diana E. De Pietri',
            role: 'INVESTIGADORA <br> Licenciada y Doctora en Ciencias Biológicas',
            photo: 'img/nosotros/Diana-copia.jpg',
            description: 'Especialización en Sistemas de Información Geográfico y Teledetección aplicado a recursos naturales y sanitarios (EPFL Suiza). Profesional técnico de la Subsecretaria de Ambiente, Ministerio del Interior, y docente investigadora del Centro de Información Metropolitana. Facultad de Arquitectura Diseño y Urbanismo. UBA Con experiencia en investigación desde 1999 y como directora de proyectos académicos desde 2002. Sus productos se muestran en las numerosas presentaciones en reuniones científicas y tecnológicas y en las publicaciones temáticas en libros y revistas nacionales e internacionales.'
        },
        {
            name: 'Alejandro Marcelo Carcagno',
            role: 'INVESTIGADOR <br> COORDINADOR INFORMATICO <br> Técnico',
            photo: 'img/nosotros/alejandro_carcagno.jpg',
            description: 'Investigador del Centro de Información Metropolitana de la Facultad de Arquitectura Diseño y Urbanismo, Universidad de Buenos Aires por más de 20 años. Especialista en Sistemas de información Geográfica, normalización y realización de bases de datos. Ha participado en la elaboración de Proyectos UBACyT y Proyectos de la Agencia Nacional de Promoción Científica y Tecnológica y trabajos específicos a terceros, exposiciones; diagramación y diseño de publicaciones.'
        },
        {
            name: 'María Victoria Majul',
            role: 'INVESTIGADORA <br> Arquitecta',
            photo: 'img/nosotros/victoria_majul.jpg',
            description: 'Graduada en la Facultad de Arquitectura Diseño y Urbanismo de la Universidad de Buenos Aires, trabaja como docente e investigadora en dicha Facultad. Se especializa en Sistemas de Información Geográfica como herramienta de apoyo en trabajos territoriales. Junto son sus colegas del Centro de Información Metropolitana, se encarga de las tareas de relevamiento y muestreo de basurales a cielo abierto en la Región Metropolitana de Buenos Aires, siendo su especialidad el trabajo en el territorio. Esta desarrollando junto con sus colegas, trabajos de investigación en relación a los residuos en el área del Delta del bajo Paraná en el partido de Tigre, e integra diversos equipos de investigación. En el área de la docencia se desarrolla en las disciplinas proyectuales, incorporando la temática.'
        },
        {
            name: 'Alejandro Cittadino',
            role: 'INVESTIGADOR <br> Doctor de la Universidad de Buenos Aires, área Ciencias Biológicas',
            photo: 'img/nosotros/alejandro_cittadino.jpg',
            description: 'Especialidad Ecología. Facultad de Ciencias Exactas y Naturales. Universidad de Buenos Aires. Subgerente de Monitoreo y Evaluaciones Ambientales–Gerencia de Desarrollo de Nuevas Tecnologías y Control Ambiental, Coordinación Ecológica Área Metropolitana Sociedad del Estado (CEAMSE). Profesor Adjunto, Departamento de Ecología Genética y Evolución–Área Ecología, Facultad de Ciencias Exactas y Naturales. Universidad de Buenos Aires. Profesor Adjunto. Facultad de Arquitectura Diseño y Urbanismo, U.B.A. Investigador en el Centro de Información Metropolitana CIM.'
        },
        {
            name: 'Natalia V.Ocello',
            role: 'INVESTIGADORA <br> Licenciada en Ciencias Biológicas',
            photo: 'img/nosotros/natalia_ocello.jpg',
            description: 'Graduada en la Facultad de Ciencias Exactas y Naturales-Universidad de Buenos Aires (FCEyN-UBA). Con orientación en Ecología. Trabaja en el Centro de Información Metropolitana- Facultad de Arquitectura Diseño y Urbanismo- Universidad de Buenos Aires- (CIM-FADU-UBA) como investigadora. Desarrolla su trabajo en la temática de BASURALES en la Región Metropolitana de Buenos Aires. Su aporte específico: Contaminación en suelos y Riesgo a la Salud. Diseños de muestreo. También lleva adelante un proyecto relacionado con la BASURA en el Humedal- Primera Sección de Islas de Bajo Delta del Paraná de las Palmas. En el ámbito privado se especializa en temáticas de contaminación ambiental urbana: Estudios de Impacto Ambiental, Gestión de Residuos Peligrosos Industriales.'
        },
        {
            name: 'Fernando Tomasi',
            role: 'INVESTIGADOR <br> Lic. en Economía (UBA-FCE)',
            photo: 'img/nosotros/fernando_tomasi.jpg',
            description: 'Especialista en Planificación Regional y Urbana (UBA-FADU), Investigador (FADU), Docente (UB) y Consultor para organismos internacionales en diversas provincias de Argentina y en Bolivia sobre temas de Planificación Regional y Urbana, Gestión de Residuos Sólidos Urbanos, Finanzas Públicas Locales y Transporte. Especialista en temas de finanzas públicas provinciales y municipales en el Ministerio de Economía y Finanzas Públicas de la Nación. Asesor en desarrollo local en el Instituto Federal de Asuntos Municipales y en el Programa de Reforma y Desarrollo Municipal.'
        },
        {
            name: 'Patricia Mayo',
            role: 'INVESTIGADORA <br> Arquitecta',
            photo: 'img/nosotros/Patricia_mayo.jpg',
            description: 'Graduada en la Universidad de Buenos Aires. En dicha institución realizó estudios de Posgrado sobre Planificación Urbano-Regional. Participó en empresas relacionadas con Sistemas de Información Geográfica. Intervino en la Dirección General de Programas y Proyectos de la Secretaría de Planeamiento Urbano del Gobierno de la Ciudad de Buenos Aires. Es Docente de la Cátedra Planificación Urbana de la Carrera de Arquitectura de la FADU-UBA. Es analista de proyectos GIS en el Centro de Información Metropolitana (UBA). Participa en el proyecto “Estrategias de Intervención en Territorios de Exclusión”, con sede en el Instituto Superior de Urbanismo (UBA).'
        },
        // Añadir más miembros según sea necesario
    ];

    teamMembers.forEach(member => {
        member.addEventListener('click', () => {
            const memberIndex = member.getAttribute('data-member') - 1;
            const selectedMember = members[memberIndex];

            selectedPhoto.src = selectedMember.photo;
            memberName.innerHTML = selectedMember.name;
            memberRole.innerHTML = selectedMember.role;
            memberDescription.innerHTML = selectedMember.description;

            // Mostrar el contenedor de team-info cuando se hace clic en un miembro
            teamInfo.style.display = 'flex';
            // Desplazar la página al contenedor de información del miembro seleccionado
            window.location.hash = '#team-info';
        });
    });
});


