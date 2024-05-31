const axiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");

const mock = new axiosMockAdapter(axios);

mock.onPost("/auth/signup").reply(200, { message: "회원가입에 성공했습니다" });

describe("회원가입 테스트", () => {
  it("회원가입에 성공하는지 확인", async () => {
    const signUpData = {
      nick: "testuser",
      password: "testpassword",
    };

    try {
      const response = await axios.post("/auth/signup", signUpData);

      expect(response.status).toEqual(200);
      expect(response.data.message).toEqual("회원가입에 성공했습니다");
    } catch (error) {
      throw error;
    }
  });
});
