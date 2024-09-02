import { Tab, Tabs } from '@nextui-org/react'
import React from 'react'

const Page = () => {
  return (
    <div className="flex justify-center items-center w-[100vw] pt-10">
      <div className="flex flex-col w-[800px] ">
        <Tabs
          aria-label="Options"
          placement={"top"}
          className="flex justify-center items-center"
        >
          <Tab key="Studentcourses" title="Student courses">

          </Tab>
        </Tabs>
        </div>
        </div>

  )
}

export default Page