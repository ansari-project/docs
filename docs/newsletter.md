# Newsletter

Stay up to date with the latest Ansari features, improvements, and Islamic knowledge resources.

<div id="newsletter-form-container">
  <form id="newsletter-form">
    <div class="form-group">
      <label for="newsletter-email">Email address <span class="required">*</span></label>
      <input type="email" id="newsletter-email" name="email" required placeholder="you@example.com">
    </div>
    <div class="form-group">
      <label for="newsletter-name">Name</label>
      <input type="text" id="newsletter-name" name="name" placeholder="Your name (optional)">
    </div>
    <button type="submit" id="newsletter-submit">Subscribe</button>
  </form>
  <div id="newsletter-message" style="display: none;"></div>
</div>

<script>
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  var btn = document.getElementById('newsletter-submit');
  var msg = document.getElementById('newsletter-message');
  var email = document.getElementById('newsletter-email').value.trim();
  var name = document.getElementById('newsletter-name').value.trim();

  btn.disabled = true;
  btn.textContent = 'Subscribing...';
  msg.style.display = 'none';

  var body = {
    email: email,
    projectSlug: 'ansari',
    interests: ['islamic']
  };
  if (name) body.name = name;

  fetch('https://marketmaker.cluesmith.com/api/newsletter/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  .then(function(res) {
    if (!res.ok) throw new Error('Subscription failed (status ' + res.status + ')');
    return res.json();
  })
  .then(function() {
    msg.className = 'newsletter-success';
    msg.textContent = 'You have been subscribed. Welcome!';
    msg.style.display = 'block';
    document.getElementById('newsletter-form').style.display = 'none';
  })
  .catch(function(err) {
    msg.className = 'newsletter-error';
    msg.textContent = 'Something went wrong: ' + err.message;
    msg.style.display = 'block';
    btn.disabled = false;
    btn.textContent = 'Subscribe';
  });
});
</script>
