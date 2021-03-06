import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentsController } from "./controllers/CreateComplimentsController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserSenderComplimentsController } from "./controllers/ListUserSenderComplimentsController";
import { ListUserReceiverComplimentsController } from "./controllers/ListUserReceiverComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUserController } from "./controllers/ListUserController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentsController = new CreateComplimentsController();
const listUserSenderComplimentsController = new ListUserSenderComplimentsController();
const listUserReceiverComplimentsController = new ListUserReceiverComplimentsController();
const listTagsController = new ListTagsController();
const listUserController = new ListUserController();

router.post("/users", createUserController.handle);
router.post("/tags",ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post("/session", authenticateUserController.handle);
router.post("/compliments", ensureAuthenticated, createComplimentsController.handle);

router.get("/users/compliments/send", ensureAuthenticated, listUserSenderComplimentsController.handle);
router.get("/users/compliments/receiver", ensureAuthenticated, listUserReceiverComplimentsController.handle);

router.get("/tags", ensureAuthenticated, listTagsController.handle);
router.get("/users", ensureAuthenticated, listUserController.handle);


export { router }