import React from "react";
import "./Footer.css"

function Footer() {
  return (
    // <footer className="footer-container">
    //   <div className="about_us">
    //     <div className="about_us_title">About Us</div>
    //     <div className="about_us_link_div">
    //         Project Repo
    //       <a href="https://github.com/Yue-Hao14/DivvyUp-Group-Project" target="_blank" rel="noreferrer">
    //         <i class="contact_us_github_icon fa-brands fa-github" />
    //       </a>
    //     </div>
    //   </div>
    //   <div className="contact-name">
    //     Nick Arakaki
    //     <div className="contact-links">
    //       <a href="https://www.linkedin.com/in/nicholas-arakaki-10aa66149" target="_blank" rel="noreferrer">
    //         <i className="contact_us_linkedin_icon fa-brands fa-linkedin" />
    //       </a>
    //       <a href="https://github.com/NickArakaki" target="_blank" rel="noreferrer">
    //         <i class="contact_us_github_icon fa-brands fa-github" />
    //       </a>
    //     </div>
    //   </div>
    //   <div className="contact-name">
    //     Troy Lee
    //     <div className="contact-links">
    //       <a href="#" target="_blank" rel="noreferrer">
    //         <i className="contact_us_linkedin_icon fa-brands fa-linkedin" />
    //       </a>
    //       <a href="https://github.com/troybloy" target="_blank" rel="noreferrer">
    //         <i class="contact_us_github_icon fa-brands fa-github" />
    //       </a>
    //     </div>
    //   </div>
    //   <div className="contact-name">
    //     Yue Hao
    //     <div className="contact-links">
    //       <a href="#" target="_blank" rel="noreferrer">
    //         <i className="contact_us_linkedin_icon fa-brands fa-linkedin" />
    //       </a>
    //       <a href="https://github.com/Yue-Hao14" target="_blank" rel="noreferrer">
    //         <i class="contact_us_github_icon fa-brands fa-github" />
    //       </a>
    //     </div>
    //   </div>
    //   <div className="contact-name">
    //     Tuan Tran
    //     <div className="contact-links">
    //       <a href="#" target="_blank" rel="noreferrer">
    //         <i className="contact_us_linkedin_icon fa-brands fa-linkedin" />
    //       </a>
    //       <a href="https://github.com/kutun0901" target="_blank" rel="noreferrer">
    //         <i class="contact_us_github_icon fa-brands fa-github" />
    //       </a>
    //     </div>
    //   </div>
    // </footer>
    <footer className="footer_container">
      <div className="about_us_title_container">
        <div className="about_us_title">About Us</div>
      </div>
      <div className="about_us_container">
        <div className="project_repo_container">
          <div className="project_repo_title">Project Repo</div>
            <a href="https://github.com/Yue-Hao14/DivvyUp-Group-Project" target="_blank" rel="noreferrer">
              <i className="contact_us_github_icon fa-brands fa-github" />
            </a>
        </div>
        <div className="about_us_dev_container">
          <div className="about_us_dev_name">Nick Arakaki</div>
          <div className="about_us_dev_contact_links">
            <a href="https://www.linkedin.com/in/nicholas-arakaki-10aa66149" target="_blank" rel="noreferrer">
              <i className="contact_us_linkedin_icon fa-brands fa-linkedin" />
            </a>
            <a href="https://github.com/NickArakaki" target="_blank" rel="noreferrer">
              <i class="contact_us_github_icon fa-brands fa-github" />
            </a>
          </div>
        </div>
        <div className="about_us_dev_container">
          <div className="about_us_dev_name">Troy Lee</div>
          <div className="about_us_dev_contact_links">
            <a href="https://www.linkedin.com/in/nicholas-arakaki-10aa66149" target="_blank" rel="noreferrer">
              <i className="contact_us_linkedin_icon fa-brands fa-linkedin" />
            </a>
            <a href="https://github.com/troybloy" target="_blank" rel="noreferrer">
              <i class="contact_us_github_icon fa-brands fa-github" />
            </a>
          </div>
        </div>
        <div className="about_us_dev_container">
          <div className="about_us_dev_name">Yue Hao</div>
          <div className="about_us_dev_contact_links">
            <a href="https://www.linkedin.com/in/yue-hao/" target="_blank" rel="noreferrer">
              <i className="contact_us_linkedin_icon fa-brands fa-linkedin" />
            </a>
            <a href="https://github.com/Yue-Hao14" target="_blank" rel="noreferrer">
              <i class="contact_us_github_icon fa-brands fa-github" />
            </a>
          </div>
        </div>
        <div className="about_us_dev_container">
          <div className="about_us_dev_name">Tuan Tran</div>
          <div className="about_us_dev_contact_links">
            <a href="https://www.linkedin.com/in/nicholas-arakaki-10aa66149" target="_blank" rel="noreferrer">
              <i className="contact_us_linkedin_icon fa-brands fa-linkedin" />
            </a>
            <a href="https://github.com/kutun0901" target="_blank" rel="noreferrer">
              <i class="contact_us_github_icon fa-brands fa-github" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
