// Create a style element
var tailwindStyles = document.createElement('style');

// Set the innerHTML of the style element to include the Tailwind CSS CDN link

// Append the style element to the document head
document.head.appendChild(tailwindStyles);


const arrE = [' ', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];
const arrA = [' ', 'ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'د', 'ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط', 'ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ز', 'ظ'];

const customMapping = {
  'ض': 'q',
  'ص': 'w',
  'ث': 'e',
  'ق': 'r',
  'ف': 't',
  'غ': 'y',
  'ع': 'u',
  'ه': 'i',
  'خ': 'o',
  'ح': 'p',
  'ج': '[',
  'د': ']',
  'ش': 'a',
  'س': 's',
  'ي': 'd',
  'ب': 'f',
  'ل': 'g',
  'ا': 'h',
  'ت': 'j',
  'ن': 'k',
  'م': 'l',
  'ك': ';',
  'ط': "'",
  'ئ': 'z',
  'ء': 'x',
  'ؤ': 'c',
  'ر': 'v',
  'لا': 'b',
  'ى': 'n',
  'm': 'ة',
  'ة': 'm',
  'و': ',',
  'ز': '.',
  'ظ': '/',
  'لإ': 't',
  'لأ': 'g',
  'لا': 'gh',
};

function convertText(str, fromArr, toArr, customMapping) {
  const strlen = str.length;
  let result = '';
  let prevChar = ''; // To keep track of the previous character.
  let lamhmaza = '';





  for (let i = 0; i < strlen; i++) {
    const char = str.charAt(i);
   let NextChar = str.charAt(i + 1 )
    // Check for context-based mappings
    if (['ل' , 'أ' , 'إ' ].includes(char)) {

      if (char === 'ل') {
        lamhmaza = char
      }

      if (char === 'أ') {
        if (lamhmaza === 'ل') {
          result += customMapping['لأ']

        lamhmaza = ''
        }
        else{

        result += customMapping[char];
        }
      }

      if (char === 'إ') {

        if (lamhmaza === 'ل') {
          result += customMapping['لإ']
        lamhmaza = ''
        }
        else{

        result += customMapping[char];
        }
      }
      if(NextChar !==   'أ'  && NextChar !=='إ' && char === 'ل' ) {
           console.log(NextChar)
        result += customMapping[char];
      }
    }



      else  if (customMapping[char]){
        result += customMapping[char];
      }
    else {
      let found = false;
      for (let i = 0; i < fromArr.length; i++) {
        if (char.toLowerCase() === fromArr[i]) {
          result += toArr[i];
          found = true;
          break;
        }
      }

      if (!found) {
        for (let i = 0; i < toArr.length; i++) {
          if (char.toLowerCase() === toArr[i]) {
            result += fromArr[i];
            break;
          }
        }
      }
    }

    prevChar = char; // Update the previous character.
  }

  return result;
}

function convertBetweenLanguages(text) {
  const detectedLanguage = /[\u0600-\u06FF]/u.test(text) ? 'arabic' : 'english';

  if (detectedLanguage === 'english') {
    return convertText(text, arrA, arrE, customMapping); // Convert from English to Arabic
  } else {
    return convertText(text, arrE, arrA, customMapping); // Convert from Arabic to English
  }
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        // Perform the translation here
        const selectedText = window.getSelection().toString();

        const convertedText = convertBetweenLanguages(selectedText);

        // Create a div element to display the translated text
        var translationDiv = document.createElement('div');
        translationDiv.style.position = 'fixed';
        translationDiv.style.zIndex = '9999';
        translationDiv.style.top = '20px'; // Adjust the top position as needed
        translationDiv.style.left = '20px'; // Adjust the left position as needed




  translationDiv.style.background = 'linear-gradient(to right, #E5E7EB, #D1D5DB)'; // Background color
  translationDiv.style.border = '1px solid #ccc'; // Border
        translationDiv.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'; // Box shadow
        translationDiv.style.borderRadius = '12px'; // Border radius
        translationDiv.style.fontFamily = 'Arial, sans-serif'; // Font family
        translationDiv.style.maxWidth = '300px'; // Maximum width
        translationDiv.style.transition = 'opacity 0.3s'; // Add a smooth opacity transition

        // Create a container div for content
        var contentContainer = document.createElement('div');
        contentContainer.style.padding = '15px'; // Padding for content container

        // Create a paragraph element for the translated text
        var textParagraph = document.createElement('p');
        textParagraph.textContent = convertedText;
        textParagraph.style.margin = '0'; // Remove default margin
        textParagraph.style.fontSize = '20px'; // Font size

textParagraph.style.fontWeight = 'bold';

        textParagraph.style.color = '#333'; // Text color







            var copyButton = document.createElement('button');
            copyButton.textContent = 'Copy';
  // Apply styles to the button using JavaScript
copyButton.style.backgroundColor = 'black';
copyButton.style.color = 'white';
copyButton.style.border = 'none';
copyButton.style.padding = '10px 20px';
copyButton.style.cursor = 'pointer';
copyButton.style.fontSize = '16px';
copyButton.style.fontWeight = 'bold';
copyButton.style.borderRadius = '8px';
copyButton.style.marginTop = '10px';
copyButton.style.opacity = '0.75';
copyButton.style.transition = 'opacity 1s';
copyButton.style.background = 'linear-gradient(to right, #718096, #2B3648)';

  // Add hover effect
copyButton.addEventListener('mouseover', function () {
    copyButton.style.opacity = '1';
});

copyButton.addEventListener('mouseout', function () {
    copyButton.style.opacity = '0.75';
});

//  copyButton.className = 'bg-black text-white border-none py-1 px-3 cursor-pointer text-lg font-bold rounded mt-4 rounded-lg  opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200';

            copyButton.addEventListener('click', function () {
            // Fade out the div with opacity animation
            translationDiv.style.opacity = '0';

            // Remove the div after the animation completes
            setTimeout(function () {
            document.body.removeChild(translationDiv);
            }, 300);

            // Copy the text to the clipboard
            copyTextToClipboard(convertedText);
            });

        // Append the elements to the container
        contentContainer.appendChild(textParagraph);
        contentContainer.appendChild(copyButton);

        // Append the container to the translation div
        translationDiv.appendChild(contentContainer);

        // Append the div to the body
        document.body.appendChild(translationDiv);

        // Send a response if needed
        sendResponse({ result: convertedText });

});

// Function to copy text to the clipboard
function copyTextToClipboard(text) {
    var tempInput = document.createElement('input');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    document.body.appendChild(tempInput);
    tempInput.value = text;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}
