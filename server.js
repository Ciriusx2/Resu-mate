async function fetchWithDelay() {
    try {
        // First fetch request to upload LaTeX data
        const uploadResponse = await fetch("https://texviewer.herokuapp.com/upload.php?uid=34c57052-3695-45c7-a53e-4c9ff5f77d54", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryjWZKcF5T8D5zFvkq",
                "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Linux\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "cookie": "__gads=ID=792cc8f9e3e68eed:T=1742723375:RT=1742723375:S=ALNI_MYavdnlVmg9G9QWLlyWu984hPAIMg; __gpi=UID=0000106f9039aee9:T=1742723375:RT=1742723375:S=ALNI_Ma1h6dVBWUEqvdyXAqbLZTGR3nGDA; FCNEC=%5B%5B%22AKsRol-XjNOt8kXX9pXjB_JGywy8W7rf67jAHRA65b1pQ3JnzPBFfnXyyAVKJsiMd3ZauJDWg1cldPwya9rrUBmNDsLepapPBo6XzM0uzU8vXtwRFhV5sQXFhezanbE_WS8QzBypVG-sSVDPa78vKzdoDvZs5ILB6w%3D%3D%22%5D%5D",
                "Referer": "https://texviewer.herokuapp.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": "------WebKitFormBoundaryjWZKcF5T8D5zFvkq\r\nContent-Disposition: form-data; name=\"texts\"\r\n\r\n\\documentclass[a4paper,11pt]{article}\r\n\r\n% Packages\r\n\\usepackage[empty]{fullpage}\r\n\\usepackage{titlesec}\r\n\\usepackage{hyperref}\r\n\\usepackage{fontawesome5}\r\n\\usepackage[left=0.7in,top=0.5in,right=0.7in,bottom=0.5in]{geometry}\r\n\\usepackage{color}\r\n\\usepackage{array}\r\n\\usepackage{ragged2e}\r\n\\usepackage{enumitem}\r\n\r\n% Colors\r\n\\definecolor{linkcolor}{RGB}{0, 102, 204}\r\n\r\n% Custom commands\r\n\\titleformat{\\section}{\\Large\\scshape\\raggedright}{}{0em}{}[\\titlerule]\r\n\\titlespacing*{\\section}{0pt}{10pt}{6pt}\r\n\r\n% Hyperlink setup\r\n\\hypersetup{\r\n    colorlinks=true,\r\n    linkcolor=linkcolor,\r\n    urlcolor=linkcolor\r\n}\r\n\r\n% Adjust itemize spacing\r\n\\setitemize{itemsep=1pt, parsep=0pt, topsep=2pt, partopsep=0pt}\r\n\r\n% Custom command for project entries\r\n\\newcommand{\\project}[4]{\r\n    \\textbf{#1} \\hfill #2 \\\\\r\n    \\textit{\\href{#3}{#3}} \\\\[1pt]\r\n    #4\r\n}\r\n\r\n\\begin{document}\r\n\r\n% Header\r\n{\\centering\r\n\\huge\\textbf{Suraj Barik}\\\\[8pt]\r\n}\r\n\r\n% Contact information centered and in one line\r\n\\begin{center}\r\nDelhi, India $\\mid$\r\n\\href{mailto:surajbarik2003@gmail.com}{\\faEnvelope\\ surajbarik2003@gmail.com} $\\mid$\r\n\\href{https://linkedin.com/in/suraj-barik-54651a221}{\\faLinkedin\\ in/suraj-barik-54651a221} $\\mid$\r\n\\href{https://github.com/sjbs2003}{\\faGithub\\ github.com/sjbs2003}\r\n\\end{center}\r\n\r\n\\section{Summary}\r\nAndroid developer skilled in Kotlin, Jetpack Compose, and MVVM architecture, with hands-on experience creating user-centric apps that enhance productivity and data efficiency. Proven record in optimizing app performance by 40\\% and improving content discovery by 75\\% through Clean Architecture and modern UI/UX practices. Experienced in Firebase, Room Database, RESTful API integration, and responsive Android development tailored for seamless, fast-loading applications.\r\n\r\n\\section{Education}\r\n\\textbf{Bachelor of Technology in Computer Science Engineering} \\hfill 2021 - 2025 \\\\\r\nGuru Gobind Singh Indraprastha University, Delhi, India \\hfill CGPA: 8.0 \\\\[3pt]\r\n\\textbf{Class XII, Central Board of Secondary Education} \\hfill 2021 \\\\\r\nArunodaya Public School, Delhi, India \\hfill Percentage: 80.5\\%\r\n\r\n\\section{Projects}\r\n\\project{Beauty Reader}{November 2024}{github.com/sjbs2003/Beauty-Reader}{\r\n\\begin{itemize}\r\n    \\item Built with a modern Android tech stack (Kotlin, Jetpack Compose, MVVM, Room) utilizing clean architecture and Material Design for an optimized user experience.\r\n    \\item Integrated robust PDF handling with PDFBox for features like text extraction, pagination, and interactive navigation with progress tracking.\r\n    \\item Designed extensive reading customizations including font adjustments, multiple reading modes, bookmarking, and text highlighting.\r\n    \\item Developed productivity tools like reading statistics dashboard, time tracking, and session management, with efficient data handling using Kotlin Coroutines and Room.\r\n\\end{itemize}\r\n}\r\n\r\n\\project{LOCO}{September 2024 - November 2024}{github.com/sjbs2003/Loco}{\r\n\\begin{itemize}\r\n    \\item Engineered a full-stack Android productivity app reducing data usage by 60\\% through offline-first architecture.\r\n    \\item Implemented robust authentication system supporting Google OAuth and email/password login.\r\n    \\item Designed intuitive note editor supporting 3 input methods, improving content discovery by 75\\%.\r\n    \\item Created smart synchronization system with automatic background syncing and offline support.\r\n    \\item Implemented real-time search functionality processing queries across 1000+ notes in under 100ms.\r\n    \\item Leveraged modern Android development stack achieving 40\\% faster app performance.\r\n\\end{itemize}\r\n}\r\n\r\n\\project{Blog App (Vrid)}{October 2024}{github.com/sjbs2003/Vrid\\_Blog\\_App}{\r\n\\begin{itemize}\r\n    \\item Developed an Android blog app with MVVM architecture and clean UI using Material Design.\r\n    \\item Integrated RESTful API with Retrofit to retrieve WordPress blog posts.\r\n    \\item Created responsive data layer using coroutines for efficient main thread management.\r\n    \\item Built HTML parser with JSoup for consistent blog content styling.\r\n\\end{itemize}\r\n}\r\n\r\n\\section{Skills}\r\n\\textbf{Android Development:} Jetpack Compose, Material Design, MVVM, Room Database, Retrofit, Firebase \\\\\r\n\\textbf{Languages:} Kotlin, Java, SQLite \\\\\r\n\\textbf{Frameworks \\& Libraries:} Kotlin Coroutines, Flow, JSoup, Coil \\\\\r\n\\textbf{Tools:} Android Studio, Gradle, Git (Version Control)\r\n\r\n\\end{document}\r\n------WebKitFormBoundaryjWZKcF5T8D5zFvkq\r\nContent-Disposition: form-data; name=\"nonstopmode\"\r\n\r\n1\r\n------WebKitFormBoundaryjWZKcF5T8D5zFvkq\r\nContent-Disposition: form-data; name=\"title\"\r\n\r\nNo Name\r\n------WebKitFormBoundaryjWZKcF5T8D5zFvkq--\r\n", "method": "POST"
        });

        console.log("Upload Response:", uploadResponse);

        // Second fetch request to check if the process is complete
        setTimeout(async () => {
            const checkResponse = await fetch("https://texviewer.herokuapp.com/upload.php?action=checkcomplete", {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "en-US,en;q=0.9",
                    "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryywOZZn4eSPRV4blV",
                    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Linux\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "cookie": "__gads=ID=792cc8f9e3e68eed:T=1742723375:RT=1742723375:S=ALNI_MYavdnlVmg9G9QWLlyWu984hPAIMg; __gpi=UID=0000106f9039aee9:T=1742723375:RT=1742723375:S=ALNI_Ma1h6dVBWUEqvdyXAqbLZTGR3nGDA; FCNEC=%5B%5B%22AKsRol-XjNOt8kXX9pXjB_JGywy8W7rf67jAHRA65b1pQ3JnzPBFfnXyyAVKJsiMd3ZauJDWg1cldPwya9rrUBmNDsLepapPBo6XzM0uzU8vXtwRFhV5sQXFhezanbE_WS8QzBypVG-sSVDPa78vKzdoDvZs5ILB6w%3D%3D%22%5D%5D",
                    "Referer": "https://texviewer.herokuapp.com/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                "body": "------WebKitFormBoundaryywOZZn4eSPRV4blV\r\nContent-Disposition: form-data; name=\"uid\"\r\n\r\n34c57052-3695-45c7-a53e-4c9ff5f77d54\r\n------WebKitFormBoundaryywOZZn4eSPRV4blV--\r\n",
                "method": "POST"
            });

            console.log("Check Response:", checkResponse);
        }, 10000);  // Wait 5 seconds before making the second fetch request

    } catch (err) {
        console.log("Error:", err);
    }
}

fetchWithDelay();
