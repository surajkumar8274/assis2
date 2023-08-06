const mainElement = document.querySelector("#main");
const htmlContent = mainElement.innerHTML;
const plainText = mainElement.innerText;
const plainTextPositions = [
    { start: 241, end: 247 },
    { start: 517, end: 524 },
];

mainElement.innerHTML = highlightHTMLContent(htmlContent, plainText, plainTextPositions);

function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
    plainText = plainText.replace(/[\n\r]+|[\s]{2,}/g, ' ').replace(/  +/g, ' ').trim();
    for (let pos of plainTextPositions) {
        const word = plainText.slice(pos.start, pos.end);
        let offsetIndex = getIndexOfTargetWord(htmlContent, word, pos.start);
        if (offsetIndex === -1) continue;
        htmlContent = htmlContent.slice(0, offsetIndex) + `<mark>${word}</mark>` + htmlContent.slice(offsetIndex + word.length);
    }
    return htmlContent;
}

function getIndexOfTargetWord(inputString, targetWord, start) {
    let index = inputString.indexOf(targetWord);
    while (index !== -1) {
        if (index > start) break;
        index = inputString.indexOf(targetWord, index + 1);
    }
    return index;
}
