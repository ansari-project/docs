(function() {
  // Don't inject on the dedicated newsletter page
  if (window.location.pathname.indexOf('/newsletter') !== -1) return;

  var footer = document.querySelector('footer');
  if (!footer) return;

  var container = document.createElement('div');
  container.id = 'footer-newsletter';
  container.innerHTML =
    '<h4>Subscribe to our newsletter</h4>' +
    '<form id="footer-newsletter-form">' +
      '<input type="email" id="footer-nl-email" placeholder="you@example.com" required>' +
      '<button type="submit">Subscribe</button>' +
    '</form>' +
    '<div id="footer-nl-message" style="display:none;"></div>';

  footer.parentNode.insertBefore(container, footer);

  document.getElementById('footer-newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = this.querySelector('button');
    var msg = document.getElementById('footer-nl-message');
    var email = document.getElementById('footer-nl-email').value.trim();

    btn.disabled = true;
    btn.textContent = 'Subscribing...';
    msg.style.display = 'none';

    fetch('https://marketmaker.cluesmith.com/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        projectSlug: 'ansari',
        interests: ['islamic']
      })
    })
    .then(function(res) {
      if (!res.ok) throw new Error('Subscription failed (status ' + res.status + ')');
      return res.json();
    })
    .then(function() {
      msg.className = 'newsletter-success';
      msg.textContent = 'You have been subscribed. Welcome!';
      msg.style.display = 'block';
      document.getElementById('footer-newsletter-form').style.display = 'none';
    })
    .catch(function(err) {
      msg.className = 'newsletter-error';
      msg.textContent = 'Something went wrong: ' + err.message;
      msg.style.display = 'block';
      btn.disabled = false;
      btn.textContent = 'Subscribe';
    });
  });
})();
