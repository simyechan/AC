const axios = require('axios');
const { loginServerPost } = require('./login');

jest.mock('axios');

describe('loginServerPost', () => {
    it('should login user with correct credentials', async () => {
        axios.post.mockResolvedValueOnce({ 
            data: { accessToken: 'dummyAccessToken' } 
        });

        const result = await loginServerPost('testuser', 'testpassword');

        expect(result.success).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('accessTkn', 'dummyAccessToken');
    });

    it('should show error message with incorrect credentials', async () => {
        axios.post.mockRejectedValueOnce({ response: { status: 404 } });

        const result = await loginServerPost('testuser', 'testpassword');

        expect(result.success).toBe(false);
        expect(result.message).toEqual('닉네임과 비밀번호를 확인해주세요');
    });
});