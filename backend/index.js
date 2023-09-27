import express from 'express'

const app = express()
 
app.listen(4001, () => {
    console.log('Server running on port 4001')
})