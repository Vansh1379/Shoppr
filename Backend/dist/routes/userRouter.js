"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userAuth_1 = require("../controllers/userAuth");
const cartApi_1 = require("../controllers/cartApi");
const router = (0, express_1.Router)();
router.post("/signup", userAuth_1.signupAuth);
router.post("/login", userAuth_1.loginLogic);
router.post("/cart", cartApi_1.AddToCart);
router.get("/:id", userAuth_1.UserDetail);
exports.default = router;