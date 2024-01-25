import Layout from "../layouts/Main";
import Background from "../layouts/Background"
import Link from "next/link";
import { Form, Input } from "antd";

const RegisterPage = () => {
  const [form] = Form.useForm()

  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <Background />
          <div className="back-button-section">
            <Link href="/products">
              <i className="icon-left"></i>Back to store
            </Link>
          </div>

          <div className="form-block">
            <h2 className="form-block__title">
              Create an account and discover the benefits
            </h2>
            {/* <p className="form-block__description">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </p> */}

            <Form
              name="register"
              form={form}
              onFinish={(values) => console.log(values)}
              style={{
                maxWidth: 600,
              }}
              scrollToFirstError
              className="form"
            >
              <Form.Item
                name="nickname"
                // label="Nickname"
                tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: 'Please input your nickname!',
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Nickname" className="form__input" />
              </Form.Item>

              <Form.Item
                name="email"
                // label="E-mail"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input placeholder="E-mail" className="form__input" />
              </Form.Item>

              <Form.Item
                name="password"
                // label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Password" className="form__input" />
              </Form.Item>

              <Form.Item
                name="confirm"
                // label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" className="form__input" />
              </Form.Item>

              <div className="form__info">
                <div className="checkbox-wrapper">
                  <label
                    htmlFor="check-signed-in"
                    className={`checkbox checkbox--sm`}
                  >
                    <input
                      name="signed-in"
                      type="checkbox"
                      id="check-signed-in"
                    />
                    <span className="checkbox__check"></span>
                    <p style={{ color: 'white' }}>
                      I agree to the Google Terms of Service and Privacy Policy
                    </p>
                  </label>
                </div>
              </div>

              <button
                type="button"
                className="btn btn--rounded btn--yellow btn-submit"
              >
                Sign up
              </button>

              <p className="form__signup-link">
                <Link href="/login">
                  <span style={{ color: 'white' }}>
                    Are you already a member?
                  </span>
                </Link>
              </p>
            </Form>

            {/* <form className="form">
              <div className="form__input-row form_register">
                <input
                  className="form__input"
                  placeholder="Full Name"
                  type="text"
                />
              </div>

              <div className="form__input-row form_register">
                <input className="form__input" placeholder="Email" type="text" />
              </div>

              <div className="form__input-row form_register">
                <input
                  className="form__input"
                  type="Password"
                  placeholder="Password"
                />
              </div>

              <div className="form__input-row form_register">
                <input
                  className="form__input"
                  type="Password"
                  placeholder="Confirm Password"
                />
              </div>

              <div className="form__info">
                <div className="checkbox-wrapper">
                  <label
                    htmlFor="check-signed-in"
                    className={`checkbox checkbox--sm`}
                  >
                    <input
                      name="signed-in"
                      type="checkbox"
                      id="check-signed-in"
                    />
                    <span className="checkbox__check"></span>
                    <p style={{ color: 'white' }}>
                      I agree to the Google Terms of Service and Privacy Policy
                    </p>
                  </label>
                </div>
              </div>

              <button
                type="button"
                className="btn btn--rounded btn--yellow btn-submit"
              >
                Sign up
              </button>

              <p className="form__signup-link">
                <Link href="/login">
                  <span style={{ color: 'white' }}>
                    Are you already a member?
                  </span>
                </Link>
              </p>
            </form> */}
          </div>
        </div>
      </section>
    </Layout>
  )
}



export default RegisterPage;
