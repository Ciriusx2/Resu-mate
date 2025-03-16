const axios = require('axios');

async function LatexFetch() {
    try {
        const response = await fetch("https://www.quicklatex.com/latex3.f", {
            method: "POST",
            headers: {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/x-www-form-urlencoded",
                "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Linux\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "cookie": "__utma=196961836.1564650532.1742117905.1742117905.1742117905.1; __utmc=196961836; __utmz=196961836.1742117905.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __utmb=196961836.1.10.1742117905",
                "Referer": "https://www.quicklatex.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: "formula=\\documentclass{article}\n\n\\usepackage{amsmath}  %25 For equations\n\\usepackage{graphicx} %25 For including graphics\n\\usepackage{geometry} %25 To adjust margins\n\n\\geometry{a4paper, margin=1in}\n\n\\title{Sample LaTeX Document}\n\\author{Your Name}\n\\date{\\today}\n\n\\begin{document}\n\n\\maketitle\n\n\\section{Introduction}\nThis is a sample document to demonstrate some basic LaTeX features, including sections, equations, and tables.\n\n\\section{Mathematics}\nYou can easily write equations in LaTeX. Here is a simple inline equation: \n\\begin{equation}\n    E = mc^2\n\\end{equation}\nThis is Einstein's famous equation for energy-mass equivalence.\n\n\\section{Table Example}\nHere is a simple table:\n\n\\begin{table}[h!]\n\\centering\n\\begin{tabular}{|c|c|c|}\n\\hline\n\\textbf{Name} %26 \\textbf{Age} %26 \\textbf{City} \\\\\n\\hline\nAlice %26 24 %26 New York \\\\\nBob   %26 30 %26 Los Angeles \\\\\nCharlie %26 28 %26 Chicago \\\\\n\\hline\n\\end{tabular}\n\\caption{Sample Table}\n\\end{table}\n\n\\section{Conclusion}\nSuraj Barik is the write of this File. LaTeX is a powerful tool for creating structured documents, especially for academic and scientific writing.\n\n\\end{document}&fsize=17px&fcolor=000000&mode=0&out=1&remhost=quicklatex.com&preamble=\\usepackage{amsmath}\n\\usepackage{amsfonts}\n\\usepackage{amssymb}&rnd=73.58573449391936"
        });

        const text = await response.text();
        console.log(text);
    } catch (err) {
        console.log("Error:", err);
    }
}

LatexFetch();
