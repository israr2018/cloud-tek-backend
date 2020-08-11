const stripe = require('stripe')('sk_test_51HEUo9CYeDSGpG2wzCgbGbWo8it93bketsPQyRhIcgBhtHrARlBxlgqUUaRS9WSv2EASc8AdloOlZ7MA7OAvVXcA00Wmt8TX7m');
const all=async()=>{
    
  const coupons=await stripe.coupons.list(
      {limit: 3}
    ).catch((e)=>{ return e;});
    return coupons;
 };
 
const create=async(payload)=>{
  const obj=  {
        name:"test",
        percent_off: 25,
        duration: 'repeating',
        duration_in_months: 3,
      }
    const createdCoupon=await stripe.coupons.create(payload).catch(e=>{
        return e;
     });
     return createdCoupon;
};

const update=async(coupon_id,payload)=>{
    
    const updatedCoupon=await stripe.coupons.update(coupon_id,payload).catch(e=>{
        return e;
     });
     return updatedCoupon;
};

const remove=async(id)=>{

    let deletedCoupon=await stripe.coupons.del(id).catch(e=>{
        return e;
    });
    return deletedCoupon;
};
const findById=async (params)=>{
   let coupon=  await stripe.coupons.retrieve(
    '25_5OFF').catch(e=>{
        return e;
     })
     return coupon;
};

module.exports={all,create,update,remove,findById};