/* eslint-disable no-console */
const httpStatus = require('http-status');
const csv = require('csv-parser');
const fs = require('fs');

const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const rewardService = require('../services/reward.service');

const createReward = catchAsync(async (req, res) => {
  // console.log('params: ', req.params);
  // console.log('body: ', req.body);
  // console.log('file: ', req.files.coupons[0]);
  // console.log('query', req.query);

  const reward = await rewardService.createReward(req.body);

  try {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.createReadStream(req.files.coupons[0].path)
      .pipe(csv())
      .on('data', (row) => {
        // console.log(row);
        const coupon = rewardService.createCoupons(row, reward.id);
        console.log(coupon);
      })
      .on('end', () => {
       // console.log('CSV file successfully processed');
      });
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.unlinkSync(req.files.coupons[0].path);
  } catch (e) {
    console.log(e);
  }
  // const reward = await rewardService.createReward(req.body);
  res.status(httpStatus.CREATED).send(reward);
});

const getRewards = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['category', 'tag', 'active']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await rewardService.queryRewards(filter, options);
  res.send(result);
});

const getRewardById = catchAsync(async (req, res) => {
  const reward = await rewardService.getRewardById(req.params.rewardId);
  if (!reward) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reward not found');
  }
  res.send(reward);
});

const updateReward = catchAsync(async (req, res) => {
  const reward = await rewardService.updateRewardById(req.params.rewardId, req.body);
  try {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.createReadStream(req.files.coupons[0].path)
      .pipe(csv())
      .on('data', (row) => {
        // console.log(row);
        const coupon = rewardService.createCoupons(row, reward.id);
        console.log(coupon);
      })
      .on('end', () => {
       // console.log('CSV file successfully processed');
      });
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.unlinkSync(req.files.coupons[0].path);
  } catch (e) {
    console.log(e);
  }
  res.send(reward);
});

const activateReward = catchAsync(async (req, res) => {
  const reward = await rewardService.updateRewardById(req.params.rewardId, {"active": true});
  res.send(reward);
});

const deactivateReward = catchAsync(async (req, res) => {
  const reward = await rewardService.updateRewardById(req.params.rewardId, {"active": false});
  res.send(reward);
});


const redeemReward = catchAsync(async (req, res) => {
  const reward = await rewardService.redeemRewardById(req.params.rewardId, req.params.userId);
  res.send(reward);
});

const getRedeemedRewardsByUser = catchAsync(async (req, res) => {
  const rewards = await rewardService.getRedeemedRewardsByUser(req.params.userId);
  res.send(rewards);
});
const deleteReward = catchAsync(async (req, res) => {
  await rewardService.deleteRewardById(req.params.rewardId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createReward,
  getRewards,
  getRewardById,
  updateReward,
  deleteReward,
  redeemReward,
  getRedeemedRewardsByUser,
  activateReward,
  deactivateReward
};
