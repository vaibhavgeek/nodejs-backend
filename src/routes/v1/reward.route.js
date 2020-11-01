const express = require('express');
const multer = require('multer');

const rewardController = require('../../controllers/reward.controller');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const rewardValidation = require('../../validations/reward.validation');

var upload = multer({ dest: 'uploads/' })

const router = express.Router();

var couponsUpload = upload.fields([{ name: 'coupons', maxCount: 1 }])

//creates reward
router.route('/create').post(auth('manageRewards'), couponsUpload , rewardController.createReward);

// view all rewards and filter by options 
router.route('/all/:user').get(auth('useRewards') , rewardController.getRewards);

// get reward by id 
router.route('/:rewardId').get(auth('useRewards') , rewardController.getRewardById);


// update reward by id 
router.route('/:rewardId').patch(auth('useRewards') , rewardController.updateReward);

// redeem coupon 
router.route('/:userId/redeem/:rewardId').post(auth('useRewards') , rewardController.redeemReward);

// get coupons history
router.route('/:userId/coupons/:rewardId').post(auth('useRewards') , rewardController.getRedeemedRewardsByUser);

// delete reward 
router.route('/:rewardId').delete(auth('manageRewards') , rewardController.deleteReward);

module.exports = router;