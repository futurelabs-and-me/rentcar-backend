module.exports = function (otp) {
  return `       
    <div class="flex w-full justify-center items-center h-screen">
 <style>
  .m-4{
  margin: 1rem
}

.mb-4{
  margin-bottom: 1rem
}

.mt-2{
  margin-top: 0.5rem
}

.mt-3{
  margin-top: 0.75rem
}

.flex{
  display: flex
}

.h-screen{
  height: 100vh
}

.min-h-full{
  min-height: 100%
}

.w-3\/5{
  width: 60%
}

.w-full{
  width: 100%
}

.items-center{
  align-items: center
}

.justify-center{
  justify-content: center
}

.rounded-lg{
  border-radius: 0.5rem
}

.rounded-md{
  border-radius: 0.375rem
}

.bg-gray-50{
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity))
}

.bg-white{
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity))
}

.p-4{
  padding: 1rem
}

.px-4{
  padding-left: 1rem;
  padding-right: 1rem
}

.py-2{
  padding-top: 0.5rem;
  padding-bottom: 0.5rem
}

.py-3{
  padding-top: 0.75rem;
  padding-bottom: 0.75rem
}

.pb-4{
  padding-bottom: 1rem
}

.pt-5{
  padding-top: 1.25rem
}

.text-center{
  text-align: center
}

.text-3xl{
  font-size: 1.875rem;
  line-height: 2.25rem
}

.text-base{
  font-size: 1rem;
  line-height: 1.5rem
}

.text-sm{
  font-size: 0.875rem;
  line-height: 1.25rem
}

.text-xs{
  font-size: 0.75rem;
  line-height: 1rem
}

.font-bold{
  font-weight: 700
}

.font-semibold{
  font-weight: 600
}

.leading-6{
  line-height: 1.5rem
}

.text-gray-500{
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity))
}

.text-gray-600{
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity))
}

.text-gray-900{
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity))
}

.outline{
  outline-style: solid
}

.outline-1{
  outline-width: 1px
}

.outline-gray-100{
  outline-color: #f3f4f6
}

@media (min-width: 640px){
  .sm\:my-8{
    margin-top: 2rem;
    margin-bottom: 2rem
  }

  .sm\:ml-4{
    margin-left: 1rem
  }

  .sm\:mt-0{
    margin-top: 0px
  }

  .sm\:flex{
    display: flex
  }

  .sm\:w-full{
    width: 100%
  }

  .sm\:max-w-lg{
    max-width: 32rem
  }

  .sm\:flex-row{
    flex-direction: row
  }

  .sm\:p-6{
    padding: 1.5rem
  }

  .sm\:px-6{
    padding-left: 1.5rem;
    padding-right: 1.5rem
  }

  .sm\:pb-4{
    padding-bottom: 1rem
  }
}

</style>         
  <div class="flex min-h-full justify-center p-4 text-center items-center w-3/5">
            <div class="outline outline-1 outline-gray-100 rounded-lg bg-white text-center  sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 ">
                  <h3
                    class="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Email Verification
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      This is your verification code:
                    </p>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 m-4 rounded-md text-3xl px-4 py-3 sm:flex sm:flex-row justify-center sm:px-6 font-bold text-gray-900">
               ${Number(otp)}
              </div>
              <div class="mb-4 text-gray-600 py-2 text-xs font-semibold">
                Thanks for using Our App 😊
              </div>
            </div>
          </div>
        </div>`;
};
