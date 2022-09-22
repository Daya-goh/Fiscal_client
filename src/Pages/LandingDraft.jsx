import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Landing */}
      <div
        className="hero py-6"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1521671413015-ce2b0103c8c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80")`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Not sure how to kickstart the habit of savings because there's
              simply too much Math involved? Don't worry, leave all the Math to
              us, you just need to key in all your expenses.
            </p>
            <button
              className="btn btn-secondary mr-2"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* <div className="hero min-h-screen bg-base-200"> */}
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://placeimg.com/260/400/arch"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">
            Saving money doesn't have to be hard
          </h1>
          <p className="py-6">
            We have simplified the process of tracking expenses for you. All you
            need to do is to key in your income, fixed expenditures, savings
            once, log in your expenses, and we will take care of the rest for
            you.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="btn btn-primary"
          >
            Get Started
          </button>
        </div>
      </div>
      {/* </div> */}
      <hr />

      {/* <div className="hero min-h-screen bg-base-200"> */}
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div>
          <h1 className="text-5xl font-bold">
            Hear from some of our satisfied users
          </h1>
          <div className="carousel w-full">
            <div className="card w-72 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Lincoln Tan</h2>
                <p>
                  I think this web-app is amazing, it contains all the features
                  and functionalities that one would ever hope to have.
                </p>
              </div>
            </div>
            <div className="card w-72 bg-primary text-primary-content">
              <div className="card-body">
                <h2 className="card-title">Primrose Everfield</h2>
                <p>
                  I've been using this to track my expenses for the past year
                  and I've never once looked back. No complicated friz or ads.
                  It's really that simple!
                </p>
              </div>
            </div>
            <div className="card w-72 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Alex Tay</h2>
                <p>
                  I had been struggling to save money for a long time. Thanks to
                  this app, I now know where all my money went to, and currently
                  I have some savings that I can fall back on during times of
                  emergency.
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("/signup")}
            className="btn btn-primary"
          >
            Try out now
          </button>
        </div>
      </div>
      {/* </div> */}
      <hr />

      {/* <div class="hero min-h-screen bg-base-200"> */}
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="https://placeimg.com/260/400/arch"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">We value feedback, as always</h1>
          <p className="py-6">
            If you have any interesting ideas that you'd like us to include in
            the app, feel free to contact us!
          </p>
          <button className="btn btn-primary">Contact us</button>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default LandingPage;
