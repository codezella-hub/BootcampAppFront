import React from "react";

function Footer() {
  return (
    <div className="footer-dashboard">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="footer-dashboard-inner">
              <p>
                Copyright © 2024 All Rights Reserved by{" "}
                <a href="#">Studyhub</a>
              </p>
              <a href="index.html">
                <img src="assets/images/logo/logo-4.svg" alt="logo" />
              </a>
              <div className="social-area-dashboard-footer">
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-linkedin" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-pinterest" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-youtube" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
