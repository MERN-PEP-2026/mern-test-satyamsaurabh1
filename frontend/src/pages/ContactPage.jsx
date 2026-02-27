const ContactPage = () => {
  return (
    <section className="container page-wrap narrow">
      <h1>Contact</h1>
      <p className="subtitle">Send project feedback or enhancement requests.</p>

      <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
        <input type="text" placeholder="Your name" required />
        <input type="email" placeholder="Email" required />
        <input type="text" placeholder="Subject" required />
        <textarea rows="5" placeholder="Message" required />
        <button type="submit" className="btn btn-primary">Send Message</button>
      </form>
    </section>
  );
};

export default ContactPage;
