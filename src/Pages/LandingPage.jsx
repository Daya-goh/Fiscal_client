/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Start: Hero Landing */}
      <div>
        <section className="text-white bg-cover bg-blend-darken bg-[url('https://images.unsplash.com/photo-1521671413015-ce2b0103c8c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80')]">
          <div className="hero-content mx-auto max-w-screen-xl lg:h-screen lg:items-center lg:flex">
            <div className="hero-content align-bottom bg-slate-50 rounded-lg text-left overflow-hidden shadow-2xl transform transition-all">
              <div className="max-w-3xl mx-auto text-center mb-4">
                <div className="hero-content">
                  <img
                    src="../logored.png"
                    loading="lazy"
                    alt="logo"
                    className="w-24 animate-pulse "
                  />
                </div>
                <p className="mb-8 text-2xl font-extrabold text-transparent sm:text-4xl bg-clip-text bg-gradient-to-r from-rose-300 via-blue-500 to-rose-600 drop-shadow-xl">
                  Welcome to FI$CAL
                </p>
                <h1 className="text-2xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-rose-300 via-blue-500 to-purple-600 drop-shadow-xl">
                  Understand Simplicity.
                  <span className="sm:block">Increase Savings.</span>
                  <span className="sm:block mb-8">Track Expenses.</span>
                </h1>

                <p className="text-indigo-500 max-w-xl mx-auto mt-4 sm:leading-relaxed sm:text-l drop-shadow-lg">
                  {" "}
                  Scroll down to learn more.
                </p>

                <div className="flex flex-wrap justify-center mt-8 gap-4">
                  <button
                    onClick={() => navigate("/login")}
                    className="block w-full px-12 py-3 text-sm font-medium text-white bg-rose-500 border border-rose-500 rounded sm:w-auto active:text-opacity-75 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring drop-shadow-xl"
                    href="/get-started"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => navigate("/signup")}
                    className="block w-full px-12 py-3 text-sm font-medium text-white border bg-blue-500 border-blue-500 rounded sm:w-auto hover:bg-rose-500 active:bg-rose-500 focus:outline-none focus:ring drop-shadow-xl"
                    href="/about"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* End: Hero Landing */}

      {/* Start: conversion funnel to signup */}
      <div className="bg-white">
        <section>
          <div className="px-4 py-16 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen">
              <div className="relative z-10 lg:py-16">
                <div className="relative h-64 sm:h-80 lg:h-full">
                  <img
                    alt="save"
                    src="https://images.pexels.com/photos/6289171/pexels-photo-6289171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="relative flex items-center bg-gray-100">
                <span className="hidden lg:inset-y-0 lg:absolute lg:w-16 lg:bg-gray-100 lg:block lg:-left-16"></span>

                <div className="p-8 sm:p-16 lg:p-24">
                  <h1 className="text-2xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-rose-300 via-blue-500 to-purple-600 drop-shadow-lg">
                    Expense Tracker
                    <span className="sm:block mb-3">For Rainy Days</span>
                  </h1>

                  <p className="mt-4 text-gray-600">
                    Not sure how to kickstart the habit of savings because there
                    is simply too much Math involved? Do not worry, leave all
                    the Math to us, you just need to key in all your expenses.
                    We understand simplicity. Leave the complexity to us and get
                    started with your fi$cal journey in just a few simplified
                    steps.
                  </p>

                  <button
                    onClick={() => navigate("/signup")}
                    className="inline-block px-12 py-3 mt-8 text-sm font-medium text-white bg-blue-500 border border-rose-500 rounded active:text-indigo-500 hover:bg-transparent hover:text-rose-500 focus:outline-none focus:ring"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* End: conversion funnel to signup */}

      {/* Start: Features explanation */}
      <div className="bg-white">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="grid gap-5 row-gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <div className="max-w-xl mb-6">
                <div>
                  <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-slate-50 uppercase rounded-full bg-amber-600">
                    Brand new
                  </p>
                </div>
                <h1 className="text-2xl font-extrabold text-transparent sm:text-4xl bg-clip-text bg-gradient-to-r from-rose-300 via-blue-500 to-purple-600 drop-shadow-lg">
                  Innovative Analytics
                  <span className="sm:block mb-3">that you will love</span>
                </h1>
                <p className="text-base text-gray-700 md:text-lg mr-12 drop-shadow-md">
                  When it comes to innovation, who is leading the way? Do you
                  know the right people to have by your side as you look to take
                  steps to evolve and transform your spending habits? Our team
                  is constantly scanning the latest developments in the world of
                  data and analytics - and getting to know the people behind
                  them. We are monitoring trends, working with smart start-ups,
                  and forging relationships with our alliance partners. We also
                  stay up-to-date with the latest moves in open source data and
                  tools, to make sure we know what is available and how you can
                  benefit.
                </p>
              </div>
              <a
                href=""
                onClick={() => navigate("/signup")}
                aria-label=""
                className="inline-flex items-center font-semibold transition-colors duration-200 text-purple-400 hover:text-purple-800"
              >
                Get Started
                <svg
                  className="inline-block w-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>
            </div>
            <div className="relative">
              <svg
                className="absolute w-full text-amber-400"
                fill="currentColor"
                viewBox="0 0 600 392"
              >
                <rect x="0" y="211" width="75" height="181" rx="8" />
                <rect x="525" y="260" width="75" height="132" rx="8" />
                <rect x="105" y="83" width="75" height="309" rx="8" />
                <rect x="210" y="155" width="75" height="237" rx="8" />
                <rect x="420" y="129" width="75" height="263" rx="8" />
                <rect x="315" y="0" width="75" height="392" rx="8" />
              </svg>
              <svg
                className="relative w-full text-purple-400"
                fill="currentColor"
                viewBox="0 0 600 392"
              >
                <rect x="0" y="311" width="75" height="81" rx="8" />
                <rect x="525" y="351" width="75" height="41" rx="8" />
                <rect x="105" y="176" width="75" height="216" rx="8" />
                <rect x="210" y="237" width="75" height="155" rx="8" />
                <rect x="420" y="205" width="75" height="187" rx="8" />
                <rect x="315" y="83" width="75" height="309" rx="8" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* End: Features explanation */}

      {/* Start: Steps Explanation */}
      <div className="min-w-screen min-h-screen bg-gray-50 flex items-center justify-center py-5 px-10">
        <h1 className="text-2xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-rose-300 via-blue-500 to-purple-600 drop-shadow-lg">
          Onboarding <span className="sm:block">Simplified</span>
        </h1>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="grid gap-6 row-gap-10 lg:grid-cols-2">
            <div className="lg:py-6 lg:pr-16">
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <svg
                        className="w-4 text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line
                          fill="none"
                          strokeMiterlimit="10"
                          x1="12"
                          y1="2"
                          x2="12"
                          y2="22"
                        />
                        <polyline
                          fill="none"
                          strokeMiterlimit="10"
                          points="19,15 12,22 5,15"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300" />
                </div>
                <div className="pt-1 pb-8">
                  <p className="mb-2 text-lg font-bold">Step 1</p>
                  <p className="text-gray-700">
                    Get started with registering a account. We only need a few
                    basic information from you.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <svg
                        className="w-4 text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line
                          fill="none"
                          strokeMiterlimit="10"
                          x1="12"
                          y1="2"
                          x2="12"
                          y2="22"
                        />
                        <polyline
                          fill="none"
                          strokeMiterlimit="10"
                          points="19,15 12,22 5,15"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300" />
                </div>
                <div className="pt-1 pb-8">
                  <p className="mb-2 text-lg font-bold">Step 2</p>
                  <p className="text-gray-700">
                    Upon securely logging in to Fi$cal, you can navigate to the
                    Budget and update the required finanical informations and
                    the program will handle the rest.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <svg
                        className="w-4 text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line
                          fill="none"
                          strokeMiterlimit="10"
                          x1="12"
                          y1="2"
                          x2="12"
                          y2="22"
                        />
                        <polyline
                          fill="none"
                          strokeMiterlimit="10"
                          points="19,15 12,22 5,15"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300" />
                </div>
                <div className="pt-1 pb-8">
                  <p className="mb-2 text-lg font-bold">Step 3</p>
                  <p className="text-gray-700">
                    Now you should be able to see your daily allowances and its
                    a good habit to insert your expenses daily with our expense
                    form.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <svg
                        className="w-4 text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line
                          fill="none"
                          strokeMiterlimit="10"
                          x1="12"
                          y1="2"
                          x2="12"
                          y2="22"
                        />
                        <polyline
                          fill="none"
                          strokeMiterlimit="10"
                          points="19,15 12,22 5,15"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300" />
                </div>
                <div className="pt-1 pb-8">
                  <p className="mb-2 text-lg font-bold">Step 4</p>
                  <p className="text-gray-700">
                    You can now navigate to the analytics page to analyze your
                    spending patterns and the overview page to have a summary of
                    your daily expenses.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <svg
                        className="w-6 text-gray-600"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <polyline
                          fill="none"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          points="6,12 10,16 18,8"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="pt-1">
                  <p className="mb-2 text-lg font-bold">
                    Awesome! You are now one-step away to financial freedom
                  </p>
                  <p className="text-gray-700" />
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                className="inset-0 object-cover object-bottom w-full rounded shadow-lg h-96 lg:absolute lg:h-full"
                src="https://images.pexels.com/photos/4473892/pexels-photo-4473892.jpeg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      {/* End: Steps Explanation */}

      {/* Start: Reviews */}
      <div className="min-w-screen min-h-screen bg-gray-50 flex items-center justify-center py-5">
        <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-16 md:py-24 text-gray-800">
          <div className="w-full max-w-6xl mx-auto">
            <div className="text-center max-w-xl mx-auto">
              <h1 className="text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-rose-300 via-blue-500 to-purple-600">
                What people are saying?
              </h1>

              <div className="text-center mb-10">
                <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
                <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                <span className="inline-block w-40 h-1 rounded-full bg-indigo-500"></span>
                <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
              </div>
            </div>
            <div className="-mx-3 md:flex items-start">
              <div className="px-3 md:w-1/3">
                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div className="w-full flex mb-4 items-center">
                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <img src="https://i.pravatar.cc/100?img=31" alt="" />
                    </div>
                    <div className="flex-grow pl-3">
                      <h6 className="font-bold text-sm uppercase text-gray-600">
                        Kara Hong
                      </h6>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-sm leading-tight">
                      <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      I like the interface and minimalist outlook. I like that
                      there is a wide variety to represent specific expenses
                      <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div className="w-full flex mb-4 items-center">
                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <img src="https://i.pravatar.cc/100?img=53" alt="" />
                    </div>
                    <div className="flex-grow pl-3">
                      <h6 className="font-bold text-sm uppercase text-gray-600">
                        Stevie Tifft.
                      </h6>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-sm leading-tight">
                      <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      Money management seems less tedious. For years Ive been
                      using excel table i made with budget plan,but having that
                      on the computer was tedious. Now it is easy to use! Useful
                      for managing expenses! its cute and practical! Very
                      usefull web application which helps you to keep on track
                      especially if you have a spending budget. It does what its
                      supposed to do. I like the color and simple design.
                      <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-3 md:w-1/3">
                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div className="w-full flex mb-4 items-center">
                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <img src="https://i.pravatar.cc/100?img=3" alt="" />
                    </div>
                    <div className="flex-grow pl-3">
                      <h6 className="font-bold text-sm uppercase text-gray-600">
                        Tommie Ewart.
                      </h6>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-sm leading-tight">
                      <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      Clean and simple design, nice colors, and great stats!
                      Great visually, super simple, good job. This web
                      application is great, Ive used it consistently for about 3
                      months now. I like the way it looks, that its easy. I have
                      been using this web application to keep track of my
                      monthly expenses. I really like everything about fi$cal,
                      it is awesome, I can track my expenses easily.
                      <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div className="w-full flex mb-4 items-center">
                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <img src="https://i.pravatar.cc/100?img=25" alt="" />
                    </div>
                    <div className="flex-grow pl-3">
                      <h6 className="font-bold text-sm uppercase text-gray-600">
                        Hae-Won Clarissa
                      </h6>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-sm leading-tight">
                      <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      I love it! Quick and easy to use. User-friendly, and
                      customizable to your needs. I love this web application.
                      It does everything I need it to do and after trying out
                      quite a few money tracking apps, I think this is the best
                      one. Very clean interface and easy to key in all the
                      expenses by daily basis.Handy, functional, customizable,
                      and cute! Just what you need to get started on being
                      financially responsible without being too rigid.
                      <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-3 md:w-1/3">
                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div className="w-full flex mb-4 items-center">
                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <img src="https://i.pravatar.cc/100?img=5" alt="" />
                    </div>
                    <div className="flex-grow pl-3">
                      <h6 className="font-bold text-sm uppercase text-gray-600">
                        Nevada Herbertson.
                      </h6>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-sm leading-tight">
                      <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      This web application is a great form of record keeping for
                      finances. Love this expense tracker. Its easy to use and
                      gives me visibility on my income and spending. I really
                      like that I can manage the categories myself so I can
                      track things in a way that is meaningful to me. This is
                      all need to manage all my expenses. Its good. Does what
                      its suppose to do. Shows me my expenses, my income, the
                      balance. I like it.
                      <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div className="w-full flex mb-4 items-center">
                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <img src="https://i.pravatar.cc/100?img=14" alt="" />
                    </div>
                    <div className="flex-grow pl-3">
                      <h6 className="font-bold text-sm uppercase text-gray-600">
                        Kris Stanton.
                      </h6>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-sm leading-tight">
                      <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      Great web application! Good to keep track of your expenses
                      and lets you know your remaining budget. Super helpful,
                      organized, clean interface. Time saver! I am bad about
                      recording expenses. This made it easy.
                      <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End: Reviews */}
    </>
  );
}

export default LandingPage;
