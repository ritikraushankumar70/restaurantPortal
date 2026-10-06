
const fs = require("fs");

let content = fs.readFileSync("src/app/settings/page.tsx", "utf-8");

if (!content.includes("useEffect")) {
    content = content.replace("import { useState } from \"react\";", "import { useState, useEffect } from \"react\";");
}

const state_code = `
  const [activeTab, setActiveTab] = useState("info");

  const [formData, setFormData] = useState({
    restaurantName: "Eatery - Premium Dining",
    description: "Serving the best North Indian and Chinese cuisine in town since 2010.",
    openTime: "10:00",
    closeTime: "23:00",
    holiday: "tuesday",
    delivery: true,
    takeaway: true,
    dineIn: false,
    estDeliveryTime: "30",
    minOrderAmount: "150",
    maxDeliveryRadius: "5",
    accHolderName: "",
    accNumber: "",
    ifscCode: "",
    upiId: "",
    autoPrint: true,
    soundAlert: true
  });

  useEffect(() => {
    const saved = localStorage.getItem("restaurantSettings");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("restaurantSettings", JSON.stringify(formData));
    alert("Settings saved successfully!");
  };
`;

content = content.replace(/  const \[activeTab, setActiveTab\] = useState\("info"\);[\s\S]*?const TABS = \[/, state_code + "\n  const TABS = [");

content = content.replace(
    `<button className="flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-700 transition shadow-sm">`,
    `<button onClick={handleSave} className="flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-700 transition shadow-sm">`
);

content = content.replace(
    /defaultValue="Eatery - Premium Dining"/,
    `value={formData.restaurantName} onChange={(e) => setFormData({...formData, restaurantName: e.target.value})}`
);

content = content.replace(
    /defaultValue="Serving the best North Indian and Chinese cuisine in town since 2010."/,
    `value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}`
);

content = content.replace(
    /defaultValue="10:00"/,
    `value={formData.openTime} onChange={(e) => setFormData({...formData, openTime: e.target.value})}`
);

content = content.replace(
    /defaultValue="23:00"/,
    `value={formData.closeTime} onChange={(e) => setFormData({...formData, closeTime: e.target.value})}`
);

content = content.replace(
    /defaultValue="tuesday"/,
    `value={formData.holiday} onChange={(e) => setFormData({...formData, holiday: e.target.value})}`
);

content = content.replace(/setDelivery\(!delivery\)/g, "setFormData({...formData, delivery: !formData.delivery})");
content = content.replace(/delivery \?/g, "formData.delivery ?");
content = content.replace(/\{delivery /g, "{formData.delivery ");

content = content.replace(/setTakeaway\(!takeaway\)/g, "setFormData({...formData, takeaway: !formData.takeaway})");
content = content.replace(/takeaway \?/g, "formData.takeaway ?");
content = content.replace(/\{takeaway /g, "{formData.takeaway ");

content = content.replace(/setDineIn\(!dineIn\)/g, "setFormData({...formData, dineIn: !formData.dineIn})");
content = content.replace(/dineIn \?/g, "formData.dineIn ?");
content = content.replace(/\{dineIn /g, "{formData.dineIn ");

content = content.replace(/setAutoPrint\(!autoPrint\)/g, "setFormData({...formData, autoPrint: !formData.autoPrint})");
content = content.replace(/autoPrint \?/g, "formData.autoPrint ?");
content = content.replace(/\{autoPrint /g, "{formData.autoPrint ");

content = content.replace(/setSoundAlert\(!soundAlert\)/g, "setFormData({...formData, soundAlert: !formData.soundAlert})");
content = content.replace(/soundAlert \?/g, "formData.soundAlert ?");
content = content.replace(/\{soundAlert /g, "{formData.soundAlert ");

content = content.replace(
    /defaultValue="30"/,
    `value={formData.estDeliveryTime} onChange={(e) => setFormData({...formData, estDeliveryTime: e.target.value})}`
);

content = content.replace(
    /defaultValue="150"/,
    `value={formData.minOrderAmount} onChange={(e) => setFormData({...formData, minOrderAmount: e.target.value})}`
);

content = content.replace(
    /defaultValue="5"/,
    `value={formData.maxDeliveryRadius} onChange={(e) => setFormData({...formData, maxDeliveryRadius: e.target.value})}`
);

content = content.replace(
    /placeholder="e\.g\. Eatery Private Limited"/,
    `placeholder="e.g. Eatery Private Limited" value={formData.accHolderName} onChange={(e) => setFormData({...formData, accHolderName: e.target.value})}`
);

content = content.replace(
    /type="password" placeholder="[^"]+"/,
    `type="password" placeholder="********" value={formData.accNumber} onChange={(e) => setFormData({...formData, accNumber: e.target.value})}`
);

content = content.replace(
    /placeholder="e\.g\. HDFC0001234"/,
    `placeholder="e.g. HDFC0001234" value={formData.ifscCode} onChange={(e) => setFormData({...formData, ifscCode: e.target.value})}`
);

content = content.replace(
    /placeholder="e\.g\. restaurant@okhdfcbank"/,
    `placeholder="e.g. restaurant@okhdfcbank" value={formData.upiId} onChange={(e) => setFormData({...formData, upiId: e.target.value})}`
);

fs.writeFileSync("src/app/settings/page.tsx", content, "utf-8");

