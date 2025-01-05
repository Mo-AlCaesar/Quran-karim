import Swal from "sweetalert2";

export const copyToClipboard = (event) => {
  const textToCopy = event.target.getAttribute("data-value");
  if (navigator.clipboard) {
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "تم نسخ رابط السورة",
          showConfirmButton: false,
          timer: 2000,
        });
      },
      (err) => {
        console.error("فشل النسخ:", err);
      }
    );
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "تم نسخ رابط السورة",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      console.error("فشل النسخ:", err);
    } finally {
      document.body.removeChild(textArea);
    }
  }
};

export function monthToAr(month) {
  const months = {
    January: "يناير",
    February: "فبراير",
    March: "مارس",
    April: "أبريل",
    May: "مايو",
    June: "يونيو",
    July: "يوليو",
    August: "أغسطس",
    September: "سبتمبر",
    October: "أكتوبر",
    November: "نوفمبر",
    December: "ديسمبر",
  };

  return months[month] ?? month;
}

export function numToAr(num) {
  const arabicNumbers = {
    0: "٠",
    1: "١",
    2: "٢",
    3: "٣",
    4: "٤",
    5: "٥",
    6: "٦",
    7: "٧",
    8: "٨",
    9: "٩",
  };

  return num
    .toString()
    .split("")
    .map((digit) => arabicNumbers[digit] || digit)
    .join("");
}

export function getNum(num) {
  return num.length === 1 ? `00${num}` : num.length === 2 ? `0${num}` : num;
}

export function removeTashkeel(text) {
  return String(text)
    .normalize("NFD")
    .replace(/[\u064B-\u065F\u0617-\u061A\u06D6-\u06ED]/g, "")
    .replace("سورة", "")
    .replace(/ٱ/g, "ا")
    .replace(/آ/g, "ا")
    .replace(/ىٰ/g, "ى");
}
