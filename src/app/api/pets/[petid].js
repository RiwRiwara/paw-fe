export default function handler(req, res) {
  const pets = {
    "1": {
      id: 1,
      name: "อาโป",
      age: 1,
      gender: "male",
      image: "/images/cat1.jpg",
      traits: [
        { name: "ติดคน", rating: 4 },
        { name: "ความขี้เล่น", rating: 4 },
        { name: "ความดุ", rating: 3 },
      ],
      health: [
        { name: "น้ำหนัก", value: "3.9 kg" },
        { name: "ทำหมัน", value: "ทำหมันแล้ว" },
        { name: "ฉีดวัคซีน", value: "เหลือวัคซีนประจำปี" },
        { name: "แพ้อาหาร", value: "แพ้กุ้ง" },
        { name: "แพ้ยา", value: "ไม่มี" },
        { name: "อื่น ๆ", value: "เคยเป็นเชื้อราแมว" },
      ],
      foundation: "Lorem ipsum dolor sit amet consectetur.",
      location: "Lorem ipsum dolor sit amet consectetur. Tempor ornare pretium ac donec placerat luctus elementum in risus.",
      adopted: false,
    },
  };

  const { petid } = req.query;
  res.status(200).json(pets[petid] || null);
}
