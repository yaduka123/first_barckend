import { Router } from 'express'
import { 
    createUser,
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser

} from '../controllers/user.controller'

const router = Router()

//Create new user
router.post('/', createUser)

//Get all users
router.get('/', getAllUsers)

//Get user by ID
router.get('/:id', getUserById)

//Delete user
router.delete('/:id', deleteUser)

//Update user
router.patch('/:id', updateUser)


export default router