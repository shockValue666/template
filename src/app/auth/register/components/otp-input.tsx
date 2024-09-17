"use client"

import * as React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

interface Props {
    otp:string,
    setOtp:React.Dispatch<React.SetStateAction<string>>
}



export const OTPInput:React.FC<Props> = ({otp,setOtp}) => {


  return (
    <div className="space-y-2">
      <InputOTP
        maxLength={6}
        value={otp}
        onChange={(otp) => setOtp(otp)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        {otp === "" ? (
          <>✨</>
        ) : (
          <>You entered: {otp}</>
        )}
      </div>
    </div>
  )
}
