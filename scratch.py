import re

with open("src/app/settings/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add useEffect import
if "useEffect" not in content:
    content = content.replace('import { useState } from "react";', 'import { useState, useEffect } from "react";')

# Define initial state
state_code = """
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

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("restaurantSettings");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("restaurantSettings", JSON.stringify(formData));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    alert("Settings saved successfully!");
  };
"""

content = re.sub(
    r'  const \[activeTab, setActiveTab\] = useState\("info"\);.*?  const TABS = \[',
    state_code + '\n  const TABS = [',
    content,
    flags=re.DOTALL
)

# Update Save button
content = content.replace(
    '<button className="flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-700 transition shadow-sm">',
    '<button onClick={handleSave} className="flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-700 transition shadow-sm">'
)

# Replace all relevant fields to use formData
content = re.sub(
    r'<input type="text" defaultValue="Eatery - Premium Dining"([^>]+)>',
    r'<input type="text" value={formData.restaurantName} onChange={(e) => setFormData({...formData, restaurantName: e.target.value})}\1>',
    content
)

content = re.sub(
    r'<textarea rows=\{3\} defaultValue="Serving the best North Indian and Chinese cuisine in town since 2010."([^>]+)></textarea>',
    r'<textarea rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}\1></textarea>',
    content
)

content = re.sub(
    r'<input type="time" defaultValue="10:00"([^>]+)>',
    r'<input type="time" value={formData.openTime} onChange={(e) => setFormData({...formData, openTime: e.target.value})}\1>',
    content
)

content = re.sub(
    r'<input type="time" defaultValue="23:00"([^>]+)>',
    r'<input type="time" value={formData.closeTime} onChange={(e) => setFormData({...formData, closeTime: e.target.value})}\1>',
    content
)

content = re.sub(
    r'<select defaultValue="tuesday"([^>]+)>',
    r'<select value={formData.holiday} onChange={(e) => setFormData({...formData, holiday: e.target.value})}\1>',
    content
)

# Order settings
content = content.replace('setDelivery(!delivery)', 'setFormData({...formData, delivery: !formData.delivery})')
content = content.replace('delivery ?', 'formData.delivery ?')
content = content.replace('{delivery ', '{formData.delivery ')

content = content.replace('setTakeaway(!takeaway)', 'setFormData({...formData, takeaway: !formData.takeaway})')
content = content.replace('takeaway ?', 'formData.takeaway ?')
content = content.replace('{takeaway ', '{formData.takeaway ')

content = content.replace('setDineIn(!dineIn)', 'setFormData({...formData, dineIn: !formData.dineIn})')
content = content.replace('dineIn ?', 'formData.dineIn ?')
content = content.replace('{dineIn ', '{formData.dineIn ')

content = content.replace('setAutoPrint(!autoPrint)', 'setFormData({...formData, autoPrint: !formData.autoPrint})')
content = content.replace('autoPrint ?', 'formData.autoPrint ?')
content = content.replace('{autoPrint ', '{formData.autoPrint ')

content = content.replace('setSoundAlert(!soundAlert)', 'setFormData({...formData, soundAlert: !formData.soundAlert})')
content = content.replace('soundAlert ?', 'formData.soundAlert ?')
content = content.replace('{soundAlert ', '{formData.soundAlert ')

# Delivery config
content = re.sub(
    r'<input type="number" defaultValue="30"([^>]+)>',
    r'<input type="number" value={formData.estDeliveryTime} onChange={(e) => setFormData({...formData, estDeliveryTime: e.target.value})}\1>',
    content
)
content = re.sub(
    r'<input type="number" defaultValue="150"([^>]+)>',
    r'<input type="number" value={formData.minOrderAmount} onChange={(e) => setFormData({...formData, minOrderAmount: e.target.value})}\1>',
    content
)
content = re.sub(
    r'<input type="number" defaultValue="5"([^>]+)>',
    r'<input type="number" value={formData.maxDeliveryRadius} onChange={(e) => setFormData({...formData, maxDeliveryRadius: e.target.value})}\1>',
    content
)

# Bank
content = re.sub(
    r'<input type="text" placeholder="e\.g\. Eatery Private Limited"([^>]+)>',
    r'<input type="text" placeholder="e.g. Eatery Private Limited" value={formData.accHolderName} onChange={(e) => setFormData({...formData, accHolderName: e.target.value})}\1>',
    content
)
content = re.sub(
    r'<input type="password" placeholder="••••••••••••"([^>]+)>',
    r'<input type="password" placeholder="••••••••••••" value={formData.accNumber} onChange={(e) => setFormData({...formData, accNumber: e.target.value})}\1>',
    content
)
content = re.sub(
    r'<input type="text" placeholder="e\.g\. HDFC0001234"([^>]+)>',
    r'<input type="text" placeholder="e.g. HDFC0001234" value={formData.ifscCode} onChange={(e) => setFormData({...formData, ifscCode: e.target.value})}\1>',
    content
)
content = re.sub(
    r'<input type="text" placeholder="e\.g\. restaurant@okhdfcbank"([^>]+)>',
    r'<input type="text" placeholder="e.g. restaurant@okhdfcbank" value={formData.upiId} onChange={(e) => setFormData({...formData, upiId: e.target.value})}\1>',
    content
)

with open("src/app/settings/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

