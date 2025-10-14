(function () {
  var STORAGE_KEY = 'theme';
  var root = document.documentElement;
  var mql = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme, withTransition) {
    if (withTransition) {
      root.classList.add('theme-transition');
      setTimeout(function () { root.classList.remove('theme-transition'); }, 220);
    }
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');

    var btn = document.getElementById('themeToggle');
    if (btn) btn.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  // синхронизируем состояние кнопки при первом рендере
  window.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('themeToggle');
    if (btn) {
      btn.setAttribute('aria-pressed', String(currentTheme() === 'dark'));
      btn.addEventListener('click', function () {
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next, true);
      });
    }
  });

  // если пользователь НЕ делал явный выбор, следуем за системой
  // (boot-скрипт уже применил стартовую тему; здесь слушаем дальнейшие изменения)
  mql.addEventListener && mql.addEventListener('change', function (e) {
    var explicit = localStorage.getItem(STORAGE_KEY);
    if (explicit !== 'light' && explicit !== 'dark') {
      applyTheme(e.matches ? 'dark' : 'light', true);
    }
  });
})();
