import "./styles/Footer.css";

function Footer() {
    return (
        <footer className="footerf">

            <p className="footer-tagline">
                Detect. Verify. Trust.
            </p>

            <p className="footer-copy">
                © 2026 Tanishka Kora • Built with React, FastAPI & TensorFlow
            </p>

            <div className="footer-links">
                <a href="#">Privacy Policy</a>
                <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=kora.tanishka@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Contact Us
                </a>
                <a
                    href="https://github.com/tanishkakora"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
            </div>
        </footer>
    );
}

export default Footer;