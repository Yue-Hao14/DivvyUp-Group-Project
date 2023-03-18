import React from "react";
import aboutApp from "../../assets/people-collaborating-with-tech- (1).jpg"
import './LoggedOutSplashPage.css'



function LoggedOutSplashPage() {
    return (
        <div className="log-out-splash-page-wrapper">
            <h1>Welcome to DivvyUp!</h1>
            <div className="log-out-splash-page">
                <div className="about-app-wrapper">
                    <div className="about-app-text-container">
                        <div className="about-app-title">
                            <h2>DivvyUp - The Next Generation Sharing Expense App</h2>
                        </div>
                        <div className="about-app-content">
                            <p>A website for users to track bills and share expenses with friends and family,
                                so that everyone gets paid back. We organize all your shared expenses in one place, so that everyone can see who they owe. Whether you are sharing a ski vacation, splitting rent with roommates, or paying someone back for lunch, Divvyup makes life easier.</p>
                        </div>
                    </div>
                    <div className="about-app-pic">
                        <img src={aboutApp} alt="about app pic"></img>
                    </div>
                </div>
                <div className="app-features-wrapper">
                    <div className="app-features-title">
                        <h3>Using DivvyUp ensures that you never lose track of your debts and credits,
                            always keeping you informed of who you owe and who owes you.</h3>
                    </div>
                    <div className="features-list-container">
                        <div className="features-list-left">
                            <div>
                                <span>
                                    <i className="fa-solid fa-user-group"></i>
                                </span>
                                Keep track of who owes what and settle up easily
                            </div>
                            <div>
                                <span>
                                    <i className="fa-regular fa-comments"></i>
                                </span>
                                Provides the option to add comments, communication to expenses
                            </div>
                            <div>
                                <span>
                                    <i className="fa-solid fa-people-group"></i>
                                </span>
                                Offers the ability to create and manage group expenses (coming up features)
                            </div>
                        </div>
                        <div className="features-list-right">
                            <div>
                                <span>
                                    <i className="fa-solid fa-money-bill-transfer"></i>
                                </span>
                                Split expenses among many friends
                            </div>
                            <div>
                                <span>
                                    <i className="fa-regular fa-pen-nib"></i>
                                </span>
                                Be able to create, update and delete expenses
                            </div>
                            <div>
                                <span>
                                    <i className="fa-solid fa-eraser"></i>
                                </span>
                                Offers secure your private information
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >

    )
}

export default LoggedOutSplashPage;
