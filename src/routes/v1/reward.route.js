const express = require('express');
const multer = require('multer');

const rewardController = require('../../controllers/reward.controller');
const auth = require('../../middlewares/auth');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

const couponsUpload = upload.fields([{ name: 'coupons', maxCount: 1 }]);


// creates reward
router.route('/create').post(auth('manageRewards'), couponsUpload, rewardController.createReward);

// view all rewards and filter by options
router.route('/all/:user').get(auth('useRewards'), rewardController.getRewards);

// get reward by id for admin
router.route('/:rewardId').get(auth('useRewards'), rewardController.getRewardById);

// get reward for the app users
// router.route('/:rewardId/view').get(auth('useRewards') , rewardController.getRewardWithCoupon);

// update reward by id
router.route('/:rewardId').patch(auth('manageRewards'), couponsUpload, rewardController.updateReward);
router.route('/:rewardId/activate').post(auth('manageRewards'), rewardController.activateReward);
router.route('/:rewardId/deactivate').post(auth('manageRewards'), rewardController.deactivateReward);

// redeem coupon
router.route('/:userId/redeem/:rewardId').post(auth('useRewards'), rewardController.redeemReward);

// get coupons history
router.route('/:userId/coupons').get(auth('useRewards') , rewardController.getRedeemedRewardsByUser);

// delete reward
router.route('/:rewardId').delete(auth('manageRewards'), rewardController.deleteReward);

module.exports = router;
