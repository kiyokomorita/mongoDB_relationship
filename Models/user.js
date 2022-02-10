const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb+srv://kiyoko:xxxxxx@cluster0.zduqs.mongodb.net/relationshipDemo');
  console.log("MONGO CONNECTION OPEN!")
}
main().catch(err => {
  console.log("Connection error")
  console.log(err)
});

const userSchema = new mongoose.Schema({
  first:String,
  last:String,
  addresses:[
    {
    _id:{id:false},  //こうする事でidが非表示になる  
    street:String,
    city : String,
    state:String,
    country:String


  }
    
  ]
})

const User = mongoose.model('User', userSchema)

const makeUser = async() =>{
  const u = new User({
    first: 'Harry',
    last :'Potter'
  })
  u.addresses.push({
    street: '123 Sesame St.',
    city: 'New York',
    state: 'NY',
    country: 'USA'
  })
  const res = await u.save()
  console.log(res)
}
const addAddress = async(id)=>{
  const user = await User.findById(id);
  user.addresses.push(
    {
    street: '99 3rd St.',
    city: 'New York',
    state: 'NY',
    country: 'USA'
  }
  )
  const res = await user.save()
  console.log(res);
}
addAddress('6204173b4e3b5a2dd0dc87b9')