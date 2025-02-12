import React from 'react'

function header() {
  return (
<div className="header-transparent">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="header-tranaparent-main-wrapper">
          <a href="index-2.html" className="logo-area">
            <img src="assets/images/logo/logo-1.svg" alt="logo" />
          </a>
          <div className="right-area">
            <a href="registration.html" className="rts-btn btn-primary-white">Sign Up</a>
            <div className="menu-btn" id="menu-btn">
              <svg width={20} height={16} viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y={14} width={20} height={2} fill="#1F1F25" />
                <rect y={7} width={20} height={2} fill="#1F1F25" />
                <rect width={20} height={2} fill="#1F1F25" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default header