document.addEventListener('DOMContentLoaded', function ()
{
  document.getElementById('script').focus();
  document.getElementById('content').classList.add('hidden');
  document.getElementById('script-form').classList.remove('hidden');

  // ENTER CONF
  document.getElementById('script').addEventListener('keyup', function(event)
  {
    if (event.key === 'Enter')
    {
      checkscript();
    }
  });

  var buttons = document.querySelectorAll('.buttons-container button');
  buttons.forEach(function(button)
  {
    button.addEventListener('click', function()
    {
      // ČÍSLO TLAČÍTKA
      var buttonNumber = button.querySelector('.button-number').innerText;
      // ID PRO TLAČÍTKO
      var contentId = 'content-' + buttonNumber;
      // ID OBSAH
      var content = document.getElementById(contentId);
      // SKRYTÍ OBSAHU
      document.querySelectorAll('.content').forEach(function(item)
      {
        item.classList.add('hidden');
      });
      // ZOBRAZENÍ OBSAHU
      if (content)
      {
        // SKRYTÍ TLAČÍTEK
        document.querySelector('.buttons-container').classList.add('hidden');
        // ZOBRAZENÍ OBSAHU
        content.classList.remove('hidden');
        // ZOBRAZENÍ TLAČÍTKA ZPĚT OD 1 DO X
        if (buttonNumber >= 1 && buttonNumber <= 3)  // UPRAVIT PO PŘIDÁNÍ DALŠÍCHO ZÁPISU!!
        {
          content.innerHTML += '<button onclick="goBack()"><span class="button-number">B</span>Zpět</button>';
          // PŘIDÁNÍ OBRÁZKŮ PRO OBSAH - DRUHÝ OBSAH
          if (buttonNumber === 1)
          {
            contentDiv.innerHTML += '<img src="folder/PV/PV1.jpg" alt="PV Image"><img src="folder/PV/PV2.jpg" alt="PV Image"><img src="folder/PV/PV3.jpg" alt="PV Image"><img src="folder/PV/PV4.jpg" alt="PV Image">';
          }
          if (buttonNumber === 2)
          {
            contentDiv.innerHTML += '<img src="folder/EMGV/EMGV1.jpg" alt="EMGV Image"><img src="folder/EMGV/EMGV2.jpg" alt="EMGV Image"><img src="folder/EMGV/EMGV3.jpg" alt="EMGV Image"><img src="folder/EMGV/EMGV4.jpg" alt="EMGV Image">';
          }
          if (buttonNumber === 3)
          {
            contentDiv.innerHTML += '<img src="folder/FSFZ/FSFZ1.jpg" alt="FSFZ Image">';
          }
        }
      }
    });
  });

  // SKRYTÍ OBSAHU PO NAČTENÍ STRÁNKY
  document.querySelectorAll('.content').forEach(function(item)
  {
    item.classList.add('hidden');
  });
});

var failedAttemptsKey = 'failedAttempts';
var blockDuration = 600000;
function checkscript()
{
  var scriptInput = document.getElementById('script');
  var enteredScript = scriptInput.value;
  var ipAddress = '';
  var failedAttempts = JSON.parse(localStorage.getItem(failedAttemptsKey)) || {};
  if (!failedAttempts[ipAddress])
  {
    failedAttempts[ipAddress] = { count: 0, lastAttempt: Date.now() };
  }
  var currentTime = Date.now();
  var timeElapsed = currentTime - failedAttempts[ipAddress].lastAttempt;
  if (timeElapsed > blockDuration && failedAttempts[ipAddress].count >= 3)
  {
    failedAttempts[ipAddress] = { count: 0, lastAttempt: currentTime };
  }
  if (failedAttempts[ipAddress].count >= 3)
  {
    document.getElementById('incorrect-script').innerText = 'Příliš mnoho neúspěšných pokusů. Zkus to později.';
    document.getElementById('incorrect-script').classList.remove('hidden');
    scriptInput.disabled = true;
    document.getElementById('unlock-button').disabled = true;
    localStorage.setItem(failedAttemptsKey, JSON.stringify(failedAttempts));
    setTimeout(function ()
    {
      scriptInput.disabled = false;
      failedAttempts[ipAddress] = { count: 0, lastAttempt: Date.now() };
      document.getElementById('incorrect-script').classList.add('hidden');
      document.getElementById('unlock-button').disabled = false;
      localStorage.setItem(failedAttemptsKey, JSON.stringify(failedAttempts));
    }, blockDuration);
    return;
  }
  var hashedScript = CryptoJS.SHA256(enteredScript).toString(CryptoJS.enc.Hex);
  var correctScriptHash = '54efe99e6d407075bbdfe21c14cad9b0103e706487e1e24e7bc2ed8396a70a3d';
  if (hashedScript === correctScriptHash)
  {
    document.getElementById('script-form').style.display = 'none';
    document.getElementById('content').style.display = 'flex';
    document.getElementById('incorrect-script').classList.add('hidden');
    failedAttempts[ipAddress] = { count: 0, lastAttempt: Date.now() };
    localStorage.setItem(failedAttemptsKey, JSON.stringify(failedAttempts));
  }
  else
  {
    if (failedAttempts[ipAddress].count === 2)
    {
      document.getElementById('incorrect-script').innerText = 'Neplatné heslo. Zadávání bylo zablokováno.';
      scriptInput.disabled = true;
      document.getElementById('unlock-button').disabled = true;
    }
    else
    {
      var remainingAttempts = 2 - failedAttempts[ipAddress].count;
      var attemptsText = remainingAttempts === 1 ? 'pokus' : 'pokusy';
      var text = remainingAttempts === 1 ? 'Zbývá 1 ' + attemptsText : 'Zbývají ' + remainingAttempts + ' ' + attemptsText;
      document.getElementById('incorrect-script').innerText = 'Neplatné heslo. ' + text + '.';
    }
    document.getElementById('incorrect-script').classList.remove('hidden');
    failedAttempts[ipAddress].count++;
    failedAttempts[ipAddress].lastAttempt = Date.now();
    scriptInput.value = '';
  }
  localStorage.setItem(failedAttemptsKey, JSON.stringify(failedAttempts));
}

// FUNKCE PRO ZOBRAZENÍ OBSAHU
function showContent(buttonNumber)
{
  // ZÍSKÁNÍ ELEMENTU S ID 'CONTENT'
  var contentDiv = document.getElementById('content');
  // OVĚŘENÍ O NALEZENÍ ELEMENTU
  if (!contentDiv)
  {
    console.error("Element s ID 'content' nebyl nalezen.");
    return;
  }
  // SKRYTÍ OBSAHU
  document.querySelectorAll('.content').forEach(function(item)
  {
    item.classList.add('hidden');
  });
  // ZOBRAZENÍ OBSAHU
  contentDiv.classList.remove('hidden');
  // SKRYTÍ VŠECH TLAČÍTEK
  var buttonsContainer = document.querySelector('.buttons-container');
  if (buttonsContainer)
  {
    buttonsContainer.classList.add('hidden');
  }
    // Zobrazit tlačítko Zpět pro obsah od parametry vedení až x
    if (buttonNumber >= 1 && buttonNumber <= 3)  // UPRAVIT PO PŘIDÁNÍ DALŠÍCHO ZÁPISU!!
    {
      contentDiv.innerHTML = '<button id="back-button" onclick="goBack()">⋘</button>';
      // PŘIDÁNÍ OBRÁZKŮ PRO KNIHY - PRVNÍ OBSAH
      if (buttonNumber === 1)
      {
        contentDiv.innerHTML += '<img src="folder/PV/PV1.jpg" alt="PV Image"><img src="folder/PV/PV2.jpg" alt="PV Image"><img src="folder/PV/PV3.jpg" alt="PV Image"><img src="folder/PV/PV4.jpg" alt="PV Image">';
      }
      if (buttonNumber === 2)
      {
        contentDiv.innerHTML += '<img src="folder/EMGV/EMGV1.jpg" alt="EMGV Image"><img src="folder/EMGV/EMGV2.jpg" alt="EMGV Image"><img src="folder/EMGV/EMGV3.jpg" alt="EMGV Image"><img src="folder/EMGV/EMGV4.jpg" alt="EMGV Image">';
      }
      if (buttonNumber === 3)
      {
        contentDiv.innerHTML += '<img src="folder/FSFZ/FSFZ1.jpg" alt="FSFZ Image">';
      }
    }
    // ZOBRAZENÍ OBSAHU DLE ID
    var contentId = 'content-' + buttonNumber;
    var content = document.getElementById(contentId);
    if (content)
    {
      content.classList.remove('hidden');
    }
    // ZOBRAZENÍ TLAČÍTKA ZPĚT
    var backButton = document.getElementById('back-button');
    if (backButton)
    {
      backButton.style.display = 'block';
    }
}

// FUNKCE PRO PŘECHOD ZPĚT
function goBack()
{
  // SKRYTÍ VŠECH TLAČÍTEK
  var buttonsContainer = document.querySelector('.buttons-container');
  if (buttonsContainer)
  {
    buttonsContainer.classList.remove('hidden');
  }
  // SKRYTÍ OBSAHU
  var content = document.getElementById('content');
  if (content)
  {
    content.classList.add('hidden');
  }
  // SKRYTÍ TLAČÍTKA ZPĚT
  var backButton = document.getElementById('back-button');
  if (backButton)
  {
    backButton.style.display = 'none';
  }
  // SKRYTÍ OBSAHU PRO HESLO
  var scriptForm = document.getElementById('script-form');
  if (scriptForm)
  {
    scriptForm.classList.remove('hidden');
  }
  //ODSTRANENÍ OBSAHU PŘIDANÝ POMOCÍ TLAČÍTKA ZPĚT
  if (content)
  {
    content.innerHTML = '';
    var contentButtons = content.querySelectorAll('.back-button');
    contentButtons.forEach(function(contentButton)
    {
      contentButton.removeEventListener('click', showContent);
    });
  }
  // PŘIDÁNÍ OBSAHU SE VŠEMI TLAČÍTKY
  if (content)
  {
    content.innerHTML += '<div class="buttons-container-back">';
    content.innerHTML += generateButtons();
    content.innerHTML += '</div>';
    var newContentButtons = content.querySelectorAll('.back-button');
    newContentButtons.forEach(function(newContentButton)
    {
      newContentButton.addEventListener('click', showContent);
    });
  }
}

// FUNKCE PRO GENEROVÁNÍ TLAČÍTEK
  function generateButtons()
  {
    var buttonsHTML = '<div class="buttons-back">';
    for (var i = 1; i <= 3; i++)  // UPRAVIT PO PŘIDÁNÍ DALŠÍCHO ZÁPISU!!
    {
      var buttonLabel;
      switch (i)
      {
        case 1: buttonLabel = "Parametry vedení"; break;
        case 2: buttonLabel = "Emg. vlny + antény"; break;
        case 3: buttonLabel = "Superhet + fáz. závěs"; break;
        default:
        buttonLabel = "E " + i;
      }
      buttonsHTML += `<button class="back-button" onclick="showContent(${i})"><span class="button-number">${i}</span>${buttonLabel}</button>`;
    }
    buttonsHTML += '</div>';
    return buttonsHTML;
}


// PADÁNÍ VLOČEK
document.addEventListener("DOMContentLoaded", function ()
{
  const snowflakesContainer = document.getElementById("snowflakes-container");
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 11, 10);    // datum se indexuje od 0 po 11, takže 0 = leden a 11 = prosinec
  const endDate = new Date(currentDate.getFullYear(), 0, 1);    // datum se indexuje od 0 po 11, takže 0 = leden a 11 = prosinec

  if (currentDate >= startDate && currentDate < endDate)
  {
    const numberOfSnowflakes = 500;
    const snowflakes = [];

    function random(min, max)
    {
      return Math.random() * (max - min) + min;
    }

    class Snowflake
    {
      constructor()
      {
        this.element = document.createElement("div");
        this.element.className = "snowflake";
        this.element.innerHTML = "*";
        snowflakesContainer.appendChild(this.element);

        this.x = random(0, window.innerWidth);
        this.y = 0;
        this.size = random(5, 18);
        this.speedX = random(-0.5, 0.5);
        this.speedY = random(0.5, 1.5);
      }

      update()
      {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y > window.innerHeight)
        {
          this.y = 0;
          this.x = random(0, window.innerWidth);
        }

        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.element.style.fontSize = `${this.size}px`;
      }
    }

    function createSnowflake()
    {
      snowflakes.push(new Snowflake());
    }

    function createSnowflakeGroup(groupSize, delay)
    {
      for (let i = 0; i < groupSize; i++)
      {
        setTimeout(createSnowflake, i * delay);
      }
    }

    function moveSnowflakes()
    {
      for (let i = 0; i < snowflakes.length; i++)
      {
        snowflakes[i].update();
      }

      requestAnimationFrame(moveSnowflakes);
    }

    createSnowflakeGroup(numberOfSnowflakes, 200);
    moveSnowflakes();
  }
});
