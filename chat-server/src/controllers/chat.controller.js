export async function welcomeController(req, res) {
  const accessToken = req.accessToken;
  const userInfo = req.userInfo;

  return res.json({
    data: {
      userInfo,
      accessToken,
    },
  });
}
