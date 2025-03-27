import Image from "next/image";
import Link from "next/link";

export default function Pet() {



  return (
    <div className="flex flex-col gap-4 min-h-screen mt-2 relative">
      <div className="flex flex-row justify-center items-center">
        <Image src="/images/giveapet.png" alt="giveapet" width={450} height={100} />
      </div>

      <h1 className="text-center text-xl font-medium text-primary-400">ประวัติส่วนตัว</h1>

      <form className="flex flex-col gap-4 p-2 w-[500px] container mx-auto mb-6">

        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col gap-2">
            <label className="text-xl font-medium text-primary-400">ชื่อ - นามสกุล</label>
            <input type="text" placeholder="ชื่อ" className="border-0 bg-gray-100 text-gray-500 rounded-lg w-full px-4 py-2" />
            <input type="text" placeholder="นามสกุล" className="border-0 bg-gray-100 text-gray-500 rounded-lg w-full px-4 py-2" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl font-medium text-primary-400">ประเภทที่พักอาศัย</label>
            <input type="text" placeholder="" className="border-0 bg-gray-100 text-gray-500 rounded-lg w-full px-4 py-2" />
          </div>
        </div>


        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col gap-2">
            <label className="text-xl font-medium text-primary-400">อายุ</label>
            <input type="number" placeholder="อายุ" className="border-0 bg-gray-100 text-gray-500 rounded-lg w-full px-4 py-2" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl font-medium text-primary-400">จำนวนสัตว์ที่เคยเลี้ยงอยู่แล้ว</label>
            <input type="text" placeholder="" className="border-0 bg-gray-100 text-gray-500 rounded-lg w-full px-4 py-2" />
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col gap-2">
            <label className="text-xl font-medium text-primary-400">อาชีพ</label>
            <input type="number" placeholder="อาชีพ" className="border-0 bg-gray-100 text-gray-500 rounded-lg w-full px-4 py-2" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl font-medium text-primary-400">จังหวัด</label>
            <input type="text" placeholder="" className="border-0 bg-gray-100 text-gray-500 rounded-lg w-full px-4 py-2" />
          </div>
        </div>

        <div className="flex flex-row justify-start w-full">
          <div className="flex flex-col gap-2">
            <label className="text-xl font-medium text-primary-400">เบอร์โทรศัพท์</label>
            <input type="text" placeholder="เบอร์โทรศัพท์" className="border-0 bg-gray-100 text-gray-500 rouadoptnded-lg w-full px-4 py-2" />
          </div>

        </div>

      </form>


      <div className="mb-3 container mx-auto w-[700px]">
        <h2 className="text-start text-xl font-medium text-primary-400 mb-4">ข้อตกลงและเงื่อนไข</h2>

        <div className="rounded-md border border-primary-400 p-4  text-primary-300 text-md">
          <p className="text-center my-4 flex-wrap">
            Lorem ipsum dolor sit amet consectetur. Feugiat diam posuere justo pellentesque orci justo fringilla justo leo. Nibh sodales amet nec pharetra scelerisque sit libero urna. Et viverra cras id neque nec. Congue vivamus diam sed commodo mollis nibh non leo. Purus hendrerit facilisis viverra leo scelerisque viverra. Sit non

          </p>
          <p className="text-center my-4 flex-wrap">

            eros duis turpis morbi neque massa. Risus venenatis laoreet nibh viverra nunc faucibus mauris nunc leo. Viverra risus phasellus mattis faucibus. Dictum quam commodo purus enim. Arcu justo varius non enim. Aliquam pellentesque ut nullam leo dis. Ultrices hac neque non vel et.
          </p>


          <p className="text-center my-4 flex-wrap">
            Integer ornare id nisi dolor et nec elementum accumsan risus. Augue congue sed ipsum posuere pellentesque aenean. Elementum lobortis est vulputate sit sed in. In eu ridiculus maecenas odio nisl arcu sit. Est id tortor tincidunt ipsum sed. Et in consectetur eu leo tellus feugiat est arcu nibh. Dictumst praesent sed ultrices vitae ultricies quis mattis eget in.
          </p>
        </div>
        {/* Checkbox */}
        <div className="flex items-center mt-4">
          <input checked id="checked-checkbox" type="checkbox" value="" className="w-4 h-4  bg-gray-100 border-gray-300 rounded-sm " />
          <label className="ms-2 text-sm font-medium text-primary-300">ยอมรับเงื่อนไขการใช้บริการ</label>
        </div>

      </div>


      <div className="container mx-auto px-10 py-2 flex flex-row justify-center bg-[#A53E55] rounded-xl  w-fit border text-white border-gray-400 shadow-md my-10 text-xl font-semibold">
        ส่งข้อมูล
      </div>



    </div >
  );
}
