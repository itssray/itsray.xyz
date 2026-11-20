(() => {
  'use strict';
  const config = window.PORTFOLIO || {};
  const $ = (selector) => document.querySelector(selector);
  const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const safeUrl = (url) => {
    const candidate = String(url || '').trim();
    if (candidate.startsWith('mailto:')) return candidate;
    try { const parsed = new URL(candidate); return ['https:', 'http:'].includes(parsed.protocol) ? parsed.href : ''; }
    catch { return ''; }
  };

  const icons = {
    github: '<path d="M9 19c-4 1.5-4-2-6-2m12 6v-3.9a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 5.77 5.07 5.07 0 0 0 18.91 2S17.73 1.65 15 4.48a13.38 13.38 0 0 0-7 0C5.27 1.65 4.09 2 4.09 2A5.07 5.07 0 0 0 4 5.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 19.1V23"/>',
    discord: '<path d="M8 6c2.7-1.3 5.3-1.3 8 0l1 2c2 .8 3.2 2 4 3.5-.5 3.1-1.4 5.4-2.7 7.2l-2.9-1.3.7-1.1c-2.7 1-5.5 1-8.2 0l.7 1.1-2.9 1.3C4.4 16.9 3.5 14.6 3 11.5 3.8 10 5 8.8 7 8z"/><path d="M8.6 13h.01M15.4 13h.01" stroke-width="3"/>',
    gamepad: '<path d="M6 12h4m-2-2v4m7-1h.01M18 11h.01"/><path d="M7 6h10a5 5 0 0 1 4.9 4l1 6a3 3 0 0 1-4.5 3L15 17H9l-3.4 2A3 3 0 0 1 1 16l1-6A5 5 0 0 1 7 6z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 6 9 7 9-7"/>',
    layers: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 13h8M8 17h5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-5 3-7 8-7s8 2 8 7"/>',
    send: '<path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/>',
    link: '<path d="M10 13a5 5 0 0 0 7 .5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>'
  };
  const svg = (name) => {
    const customPath = String(config.customIcons?.[name] || '');
    if (/^(?:assets\/icons\/)[a-z0-9_./-]+\.(?:svg|png|webp)$/i.test(customPath) && !customPath.includes('..')) {
      return `<img class="brand-icon" src="${escapeHTML(customPath)}" alt="" loading="lazy" />`;
    }
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.link}</svg>`;
  };
  const links = (Array.isArray(config.socialLinks) ? config.socialLinks : []).filter(item => safeUrl(item.url));

  document.title = config.pageTitle || `${config.name || 'Developer'} — Portfolio`;
  const desc = $('meta[name="description"]');
  if (desc) desc.setAttribute('content', config.description || 'Personal developer portfolio');
  document.documentElement.style.setProperty('--accent', config.accent || '#b4e9ff');
  for (const [key, prop] of [['color1','--bg1'],['color2','--bg2'],['color3','--bg3']]) {
    if (/^#[0-9a-f]{3,8}$/i.test(config.background?.[key] || '')) document.documentElement.style.setProperty(prop, config.background[key]);
  }
  document.querySelectorAll('[data-name]').forEach(el => el.textContent = config.name || 'yourname');
  $('#eyebrow').textContent = config.eyebrow || 'INDEPENDENT DEVELOPER';
  $('#tagline').textContent = config.tagline || 'Building things for the web.';
  $('#availability').textContent = config.availability || 'Open to opportunities';
  $('#year').textContent = String(new Date().getFullYear());
  $('#socials').innerHTML = links.length ? links.map(item => `<a class="social" href="${escapeHTML(safeUrl(item.url))}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(item.label)}" title="${escapeHTML(item.label)}">${svg(item.icon)}</a>`).join('') : '<span class="social--empty">Social links coming soon ↗</span>';
  document.querySelectorAll('[data-icon]').forEach(el => el.innerHTML = svg(el.dataset.icon));

  // Live Discord presence from Lanyard, which works from GitHub Pages.
  // Lanyard provides publicly shared presence; no bot token is necessary or safe in client code.
  const discordId = String(config.discordUserId || '').trim();
  const presenceNames = { online:'Online', idle:'Idle', dnd:'Do not disturb', offline:'Offline' };
  const presenceEl = $('#discord-person');
  const activityEl = $('#discord-activity');
  let currentSpotify = null;
  const fmtTime = (milliseconds) => {
    const totalSeconds = Math.floor(Math.max(0, milliseconds) / 1000);
    return `${Math.floor(totalSeconds/60)}:${String(totalSeconds%60).padStart(2,'0')}`;
  };
  const updateProgress = () => {
    if (!currentSpotify) return;
    const start = Number(currentSpotify.timestamps?.start);
    const end = Number(currentSpotify.timestamps?.end);
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return;
    const length = end - start;
    const elapsed = Math.max(0, Math.min(length, Date.now() - start));
    $('#activity-progress-fill').style.width = `${elapsed / length * 100}%`;
    $('#activity-elapsed').textContent = fmtTime(elapsed);
    $('#activity-duration').textContent = fmtTime(length);
  };
  const showActivity = (data) => {
    if (!config.showDiscordActivity) { activityEl.hidden = true; return; }
    const spotify = data.listening_to_spotify && data.spotify ? data.spotify : null;
    const other = !spotify && Array.isArray(data.activities) ? data.activities.find(a => a && a.type !== 4 && a.type !== 2 && a.name) : null;
    if (!spotify && !other) {
      currentSpotify = null;
      activityEl.hidden = true;
      return;
    }
    activityEl.hidden = false;
    currentSpotify = spotify;
    const artwork = $('#activity-art');
    const artUrl = spotify && /^https:\/\//.test(String(spotify.album_art_url || '')) ? spotify.album_art_url : '';
    artwork.hidden = !artUrl;
    if (artUrl) artwork.src = artUrl;
    else artwork.removeAttribute('src');
    $('#activity-label').textContent = spotify ? '♫ LISTENING ON SPOTIFY' : '◈ DISCORD ACTIVITY';
    $('#activity-title').textContent = spotify ? (spotify.song || 'Unknown song') : other.name;
    $('#activity-detail').textContent = spotify ? `${spotify.artist || 'Unknown artist'}${spotify.album ? ' · ' + spotify.album : ''}` : [other.details, other.state].filter(Boolean).join(' · ');
    const hasTimestamps = !!spotify && Number.isFinite(Number(spotify.timestamps?.start)) && Number.isFinite(Number(spotify.timestamps?.end));
    $('#activity-progress').hidden = !hasTimestamps;
    $('#activity-times').hidden = !hasTimestamps;
    updateProgress();
  };
  const drawDiscord = (data) => {
    if (!data || !data.discord_user) return;
    const user = data.discord_user;
    const avatar = $('#discord-avatar');
    const avatarHash = user.avatar;
    if (avatarHash && /^[a-zA-Z0-9_]+$/.test(avatarHash)) {
      const animated = avatarHash.startsWith('a_');
      avatar.src = `https://cdn.discordapp.com/avatars/${discordId}/${avatarHash}.${animated ? 'gif' : 'png'}?size=128`;
      avatar.hidden = false;
      $('#discord-avatar-placeholder').hidden = true;
    } else {
      avatar.hidden = true;
      $('#discord-avatar-placeholder').hidden = false;
    }
    $('#discord-username').textContent = user.global_name || user.username || 'Discord';
    const status = presenceNames[data.discord_status] || 'Unavailable';
    $('#discord-status').textContent = status;
    $('#presence-dot').dataset.status = data.discord_status || 'offline';
    showActivity(data);
  };
  if (/^\d{17,22}$/.test(discordId)) {
    presenceEl.hidden = false;
    let activeRequest = false;
    const refreshDiscord = async () => {
      if (activeRequest || document.hidden) return;
      activeRequest = true;
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`, { cache: 'no-store' });
        if (!response.ok) throw new Error('presence unavailable');
        const payload = await response.json();
        if (!payload.success || !payload.data) throw new Error('not connected to Lanyard');
        drawDiscord(payload.data);
      } catch {
        $('#discord-status').textContent = 'Presence unavailable';
        $('#presence-dot').dataset.status = 'unknown';
        activityEl.hidden = true;
        currentSpotify = null;
      } finally { activeRequest = false; }
    };
    refreshDiscord();
    window.setInterval(refreshDiscord, 20000);
    window.setInterval(() => { if (!document.hidden) updateProgress(); }, 1000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshDiscord(); });
  }


  const entry = $('#entry');
  const main = $('#main');
  const dialog = $('#content-dialog');
  const content = $('#dialog-content');
  let lastTrigger = null;
  const music = $('#background-music');
  const musicToggle = $('#music-toggle');
  const musicVolume = $('#music-volume');
  const musicConfig = config.backgroundMusic || {};
  const musicSrc = String(musicConfig.src || '').trim();
  if (musicSrc && !musicSrc.startsWith('//') && !/^[a-z][a-z0-9+.-]*:/i.test(musicSrc) && !musicSrc.includes('..')) music.src = musicSrc;
  const initialVolume = Number(musicConfig.volume);
  music.volume = Number.isFinite(initialVolume) ? Math.max(0, Math.min(1, initialVolume)) : 0.22;
  musicVolume.value = String(Math.round(music.volume * 100));
  const refreshMusic = () => {
    const playing = !music.paused && !music.ended;
    musicToggle.textContent = playing ? '♫ MUSIC ON' : '♫ MUSIC OFF';
    musicToggle.setAttribute('aria-pressed', String(playing));
    musicToggle.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
  };
  const playMusic = async () => {
    if (!music.getAttribute('src')) return;
    try { await music.play(); } catch { /* Autoplay blocked or media unavailable. */ }
    refreshMusic();
  };
  musicToggle.addEventListener('click', () => { if (music.paused) playMusic(); else { music.pause(); refreshMusic(); } });
  musicVolume.addEventListener('input', () => { music.volume = Number(musicVolume.value) / 100; });
  music.addEventListener('play', refreshMusic);
  music.addEventListener('pause', refreshMusic);
  music.addEventListener('error', () => { musicToggle.textContent = '♫ MUSIC UNAVAILABLE'; musicToggle.disabled = true; });
  const enter = () => {
    playMusic();
    entry.classList.add('entry--gone');
    main.inert = false;
    main.classList.add('main--visible');
    entry.hidden = true;
    $('.glass-button')?.focus({preventScroll:true});
  };
  entry.addEventListener('click', enter);
  entry.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enter(); } });
  $('#replay').addEventListener('click', () => {
    main.inert = true;
    main.classList.remove('main--visible');
    entry.hidden = false;
    requestAnimationFrame(() => entry.classList.remove('entry--gone'));
    entry.focus({preventScroll:true});
  });

  const render = (panel) => {
    const title = { projects:'Projects', about:'About me', contact:'Get in touch' }[panel] || 'Explore';
    $('#dialog-index').textContent = { projects:'01', about:'02', contact:'03' }[panel] || '00';
    const header = `<h2 id="dialog-title">${title}<span style="color:var(--accent)">.</span></h2>`;
    if (panel === 'projects') {
      const projects = Array.isArray(config.projects) ? config.projects : [];
      const cards = projects.map(p => {
        const url = safeUrl(p.url);
        const tag = url ? 'a' : 'div';
        const attrs = url ? `href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer"` : '';
        const tone = ['violet','green'].includes(p.color) ? ` project--${p.color}` : '';
        return `<${tag} class="project${tone}" ${attrs}><h3>${escapeHTML(p.title)} ${url ? '↗' : ''}</h3><p>${escapeHTML(p.description)}</p><div class="project__tags">${(Array.isArray(p.tags) ? p.tags : []).map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('')}</div></${tag}>`;
      }).join('');
      return `${header}<p class="modal__subheading">A collection of things I've made and am making.</p>${projects.length ? `<div class="project-list">${cards}</div>` : '<div class="empty"><div class="empty__icon">✳</div><h3>Something is in the works.</h3><p>No projects to show just yet. This space will fill up as I build and release new things.</p></div>'}`;
    }
    if (panel === 'about') {
      return `${header}<p class="modal__subheading">A little more about the person behind the screen.</p><p class="about-copy">${escapeHTML(config.description || '')}</p><div class="modal__section-title">THINGS I WORK WITH</div><div class="skills">${(Array.isArray(config.skills) ? config.skills : []).map(s => `<span class="tag">${escapeHTML(s)}</span>`).join('') || '<span class="tag">Always learning</span>'}</div><div class="about-location">⌁ Based in ${escapeHTML(config.location || 'somewhere on the internet')}</div>`;
    }
    const contacts = links.map(item => `<a class="contact-link" href="${escapeHTML(safeUrl(item.url))}" target="_blank" rel="noopener noreferrer"><span>${escapeHTML(item.label)}</span><span>↗</span></a>`).join('');
    return `${header}<p class="modal__subheading">Have an idea? Let's make something cool.</p>${contacts ? `<div class="contact-list">${contacts}</div>` : '<div class="empty"><div class="empty__icon">✉</div><h3>Contacts coming soon.</h3><p>Add your socials or email to config.js to make them appear here.</p></div>'}`;
  };
  document.querySelectorAll('[data-dialog]').forEach(button => button.addEventListener('click', () => {
    lastTrigger = button;
    content.innerHTML = render(button.dataset.dialog);
    dialog.showModal();
  }));
  $('#close-modal').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => lastTrigger?.focus({preventScroll:true}));
})();
