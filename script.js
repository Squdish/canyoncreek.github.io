// ==========================================================================
// CANYON CREEK — shared site behaviour
// ==========================================================================

// Replace this with the Discord webhook URL for whitelist applications.
const DISCORD_WHITELIST_WEBHOOK = 'https://discord.com/api/webhooks/1549500355505819799/i_8Boz_dNWJwnXm55i8tZmuELHWmePTMX2UTZ-MQ6fYorx-X79sBAZNVYFHJjE_9_bvx';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initDust();
  markActiveNav();
  initWhitelistForm();
});

function initNav(){
  const burger = document.querySelector('.nav-burger');
  const links = document.querySelector('.nav-links');
  if(!burger || !links) return;
  burger.addEventListener('click', () => {
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

function markActiveNav(){
  const path = location.pathname.endsWith('/') ? location.pathname : location.pathname + '/';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if(a.dataset.page === path) a.classList.add('active');
  });
}

function initDust(){
  const field = document.querySelector('.hero-dust');
  if(!field) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const count = 26;
  for(let i = 0; i < count; i++){
    const mote = document.createElement('span');
    const left = Math.random() * 100;
    const delay = Math.random() * 12;
    const duration = 9 + Math.random() * 8;
    const size = 2 + Math.random() * 2;
    mote.style.left = left + '%';
    mote.style.animationDelay = delay + 's';
    mote.style.animationDuration = duration + 's';
    mote.style.width = size + 'px';
    mote.style.height = size + 'px';
    field.appendChild(mote);
  }
}

function initWhitelistForm(){
  const form = document.getElementById('whitelistForm');
  if(!form) return;

  const message = document.getElementById('formMsg');
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if(DISCORD_WHITELIST_WEBHOOK === 'PASTE_DISCORD_WEBHOOK_URL_HERE'){
      showWhitelistMessage(message, 'The whitelist form is not connected yet. Add the Discord webhook URL in script.js.', true);
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Filing Application...';

    const application = {
      discord: document.getElementById('discord').value.trim(),
      age: document.getElementById('age').value,
      characterName: document.getElementById('charname').value.trim(),
      experience: document.getElementById('experience').value,
      backstory: document.getElementById('backstory').value.trim(),
      scenario: document.getElementById('scenario').value.trim()
    };

    const payload = {
      username: 'Canyon Creek Whitelist',
      embeds: [{
        title: 'New Whitelist Application',
        color: 11534336,
        fields: [
          {name: 'Discord', value: application.discord, inline: true},
          {name: 'Age', value: application.age, inline: true},
          {name: 'Character Name', value: application.characterName, inline: true},
          {name: 'Roleplay Experience', value: application.experience},
          {name: 'Character Backstory', value: limitDiscordField(application.backstory)},
          {name: 'Scenario Response', value: limitDiscordField(application.scenario)}
        ],
        timestamp: new Date().toISOString()
      }]
    };

    try{
      const response = await fetch(DISCORD_WHITELIST_WEBHOOK, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });

      if(!response.ok) throw new Error(`Discord returned ${response.status}`);

      showWhitelistMessage(message, 'Application filed. The Territory Office will review your paperwork and reach out on Discord.');
      submitButton.textContent = 'Application Filed';
    }catch(error){
      console.error('Whitelist submission failed:', error);
      showWhitelistMessage(message, 'The application could not be filed right now. Please try again or contact staff on Discord.', true);
      submitButton.disabled = false;
      submitButton.textContent = 'File Application';
    }
  });
}

function showWhitelistMessage(message, text, isError = false){
  message.textContent = text;
  message.classList.toggle('error', isError);
  message.classList.add('show');
  message.scrollIntoView({behavior:'smooth', block:'nearest'});
}

function limitDiscordField(value){
  return value.length > 1024 ? value.slice(0, 1021) + '...' : value;
}
