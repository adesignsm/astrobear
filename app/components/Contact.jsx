export const Contact = () => {
    return (
        <>
            <div className="contact-page">
                <h1>Contact</h1>
                <div class="contact-text">
                    <p>Please feel free to contact us if you have any questions or special request.</p>
                    <p>We will get back to you in 2 to 4 business days.</p>
                </div>
                <form className="contact-form">
                    <div className="name-email-container">
                        <input type='text' placeholder="Name" required />
                        <input type="email" placeholder="Email" required />
                    </div>
                    <div className="phone-number-container">
                        <input type='tel' placeholder="Phone Number (optional)" />
                    </div>
                    <div className="message-container">
                        <textarea rows={10} cols={45} placeholder="Message" />
                    </div>
                    <div className="button-container">
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>
        </>
    )
}