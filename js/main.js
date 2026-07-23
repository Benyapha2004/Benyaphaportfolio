(function(){
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');
  if(!reduced && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:.15});
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('in'); });
  }

  var currentPage = document.body.getAttribute('data-page');
  document.querySelectorAll('[data-nav]').forEach(function(a){
    if(a.getAttribute('data-nav') === currentPage) a.classList.add('active');
  });

  var progress = document.getElementById('railProgress');
  function onScroll(){
    var h = document.documentElement;
    var scrolled = h.scrollTop;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (scrolled / max) * 100 : 0;
    if(progress) progress.style.height = pct + '%';
  }
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  try { localStorage.removeItem('kt-theme-colors'); } catch(e){}

  /* ---------- language toggle ---------- */
  var LANG_KEY = 'site-lang';

  var STR = {
    clipSoon: {en:'Clip coming soon.', th:'คลิปเร็ว ๆ นี้'},
    workNotFound: {en:'Work not found', th:'ไม่พบผลงานนี้'},
    workNotFoundDesc: {en:'This item doesn’t exist — go back to the portfolio.', th:'ไม่มีรายการนี้อยู่ — กลับไปที่หน้าผลงาน'}
  };

  var I18N = {
    en: {
      'nav.home':'Home', 'nav.reel':'Showreel', 'nav.portfolio':'Portfolio', 'nav.contact':'Contact',
      'footer.credit':'2026 BENYAPHA WATTHANASEWE PORTFOLIO',
      'pagenav.prev':'← Previous Roll', 'pagenav.next':'Next Roll →',
      'slug.fadeIn':'FADE IN:', 'slug.cutTo':'CUT TO:', 'slug.fadeOut':'FADE OUT.',

      'meta.title.index':'Benyapha Watthanasewe — Film Portfolio',
      'meta.desc.index':'Editing desk and film set — showreel, portfolio, and contact info for a film major student specializing in screenwriting.',
      'index.hero.roll':'ROLL 01 PORTFOLIO BENYAPHA',
      'index.hero.title':'Welcome to my feature film.<br>I hope you enjoy the view.',
      'index.hero.sub':'Screenwriter & film student who lives on set — writing for shorts, commercials, and series, hands-on from first draft to final cut. Story is how I make people feel something real.',
      'index.slate.take':'SCENE 04 · TAKE 02',
      'index.slate.production.label':'Production',
      'index.slate.production.value':'BENYAPHA WATTHANASEWE — Portfolio 2026',
      'index.slate.role.label':'Director / Role',
      'index.slate.role.value':'Screenwriter, Editor, Cinematographer, Graphic Designer, Lighting &amp; Content Creator',
      'index.slate.scene.label':'Scene',
      'index.slate.scene.value':'Film Major Student',
      'index.skill.1':'Screenwriting', 'index.skill.2':'Short Film Scripts', 'index.skill.3':'Commercial Scripts',
      'index.skill.4':'Series Writing', 'index.skill.5':'Pre-Production', 'index.skill.6':'Post-Production', 'index.skill.7':'Storytelling',
      'index.cta.watch':'Watch Showreel', 'index.cta.contact':'Contact Me',
      'index.about.eyebrow':'About Me',
      'index.about.bio':'I’m <strong>Benyapha Watthanasewe (Ben)</strong>, 21 years old, a film major student with a passion for the art of storytelling and screenwriting. I have hands-on production experience in a range of on-set roles — across short films, series, and commercials — with a full understanding of the production process from pre-production to post-production. I’m committed to using creativity to craft work that connects with audiences’ emotions, while staying eager to learn and grow to help drive quality work forward with an organization.',
      'index.about.eduLabel':'Education',
      'index.about.eduValue':'Mahasarakham University<br>Bachelor of Creative Media<br>Faculty of Informatics<br>Expected Graduation: 2027',
      'index.about.skillsLabel':'Skills',
      'index.about.softwareLabel':'Software',
      'index.about.skill1':'<strong>Screenwriting & Creative Development</strong> — Highly imaginative; co-develops film and series scripts',
      'index.about.skill2':'<strong>Production Management</strong> — Keeps production on schedule, solves on-set problems, and supports other departments',
      'index.about.skill3':'<strong>Actor Coordination</strong> — Communicates and briefs actors on the script effectively',
      'index.about.skill4':'<strong>Leadership & Teamwork</strong> — Works well with others, both leading and following',
      'index.about.skill5':'<strong>Analytical Thinking</strong> — Assesses project feasibility and continuously develops herself',
      'index.showreel.eyebrow':'ROLL 01 · Showreel', 'index.showreel.h2':'Showreel',
      'index.showreel.note':'A compilation of work from 2025-2026.',
      'index.footer.roll':'ROLL 01 OF 04',

      'meta.title.reel':'Showreel — Benyapha Watthanasewe',
      'meta.desc.reel':'A collection of short films, commercials, and series scripts by Benyapha Watthanasewe.',
      'reel.eyebrow':'ROLL 02 · Showreel',
      'reel.h2':'Showreel — Work Through the Camera and Editing Desk',
      'reel.note':'A collection of my work, spanning short films and commercials — click below to watch.',
      'reel.featured.eyebrow':'FEATURED',
      'reel.featured.role':'Director &amp; Screenwriter',
      'reel.watchBadge':'WATCH CLIP',
      'reel.role.01B':'Screenwriter, Assistant Director &amp; Cinematographer',
      'reel.role.02A':'Screenwriter, Assistant Editor &amp; Actor',
      'reel.role.02B':'Screenwriter &amp; Assistant Editor',
      'reel.role.03A':'Screenwriter &amp; Producer',
      'reel.role.03B':'Screenwriter, Director, Cinematographer &amp; Editor',
      'reel.role.04A':'Screenwriter &amp; Director',
      'reel.role.04B':'Screenwriter, Cinematographer &amp; Editor',
      'reel.role.05A':'Director &amp; Screenwriter',
      'reel.role.05B':'Actress (Mother) &amp; Set Runner',
      'reel.role.05C':'Interview Scriptwriter, Shoot Planner &amp; Colour Grading',
      'reel.footer.roll':'ROLL 02 OF 04',
      'modal.close':'✕ CLOSE',
      'modal.link':'Watch Original ↗',

      'meta.title.portfolio':'Portfolio — Benyapha Watthanasewe',
      'meta.desc.portfolio':'Contact sheets of stills and behind-the-scenes from real productions, by Benyapha Watthanasewe.',
      'portfolio.eyebrow':'ROLL 03 · Contact Sheet',
      'portfolio.h2':'Stills &amp; Behind the Scenes',
      'portfolio.note':'Stills and behind-the-scenes from my work, spanning short films and commercials — click below to see more.',
      'portfolio.cap.01A':'Director &amp; Screenwriter — “Moha”',
      'portfolio.cap.01B':'Screenwriter, Assistant Director &amp; Cinematographer — “13°”',
      'portfolio.cap.02A':'Screenwriter, Assistant Editor &amp; Actor — “Before Blue Skies”',
      'portfolio.cap.02B':'Screenwriter &amp; Assistant Editor — “Song Phop”',
      'portfolio.cap.03A':'Screenwriter &amp; Producer — “Sense”',
      'portfolio.cap.03B':'Screenwriter, Director, Cinematographer &amp; Editor — “Wake Up”',
      'portfolio.cap.04A':'Screenwriter &amp; Director — “Bualee”',
      'portfolio.cap.04B':'Screenwriter, Cinematographer &amp; Editor — “Kong Gu”',
      'portfolio.cap.05A':'Director &amp; Screenwriter — “Born Again”',
      'portfolio.cap.05B':'Actress (Mother) &amp; Set Runner — “Son Kwan”',
      'portfolio.cap.05C':'Interview Scriptwriter, Shoot Planner &amp; Colour Grading — “EmergenZ”',
      'portfolio.graphic.eyebrow':'ROLL 03B · Graphic Design',
      'portfolio.graphic.h2':'Graphic Design Work',
      'portfolio.graphic.note':'Posters and graphic design pieces I created, from film posters to standalone visual work.',
      'portfolio.photo.eyebrow':'ROLL 03C · Photography &amp; Colour Grading',
      'portfolio.photo.h2':'Photography &amp; Colour Grading',
      'portfolio.photo.note':'Personal photography edited and colour graded by me.',
      'portfolio.photo.portrait.eyebrow':'Portraits',
      'portfolio.photo.portrait.h3':'Portrait Photography',
      'portfolio.photo.product.eyebrow':'Food &amp; Product',
      'portfolio.photo.product.h3':'Food &amp; Product Photography',
      'portfolio.cert.eyebrow':'ROLL 03D · Certificates',
      'portfolio.cert.h2':'Certificates',
      'portfolio.cert.note':'Awards and certificates from past work and activities.',
      'portfolio.footer.roll':'ROLL 03 OF 04',

      'meta.title.contact':'Contact — Benyapha Watthanasewe',
      'meta.desc.contact':'Contact channels and a message form to reach Benyapha Watthanasewe.',
      'contact.eyebrow':'ROLL 04 · Call Sheet',
      'contact.h2':'Get in Touch',
      'contact.note':'Send a message through the form, or reach out below.',
      'contact.cs.production':'Production — Portfolio 2026',
      'contact.cs.callTime':'CALL TIME: OPEN',
      'contact.cs.emailLabel':'Email', 'contact.cs.phoneLabel':'Phone', 'contact.cs.locationLabel':'Location',
      'contact.cs.locationValue':'Bangkok, Thailand',
      'contact.form.name':'Name / Production', 'contact.form.email':'Reply Email',
      'contact.form.details':'Project Details', 'contact.form.submit':'Send Message',
      'pagenav.backTo':'Back to →',
      'contact.footer.roll':'ROLL 04 OF 04',

      'meta.title.work':'Work — Benyapha Watthanasewe',
      'meta.desc.work':'Clip and behind-the-scenes photos from a production by Benyapha Watthanasewe.',
      'work.back':'← BACK TO PORTFOLIO',
      'work.title.loading':'Loading…',
      'work.gallery.title':'BEHIND THE SCENES',
      'work.pagenav.backTo':'← Back to',
      'work.footer.roll':'ROLL 03 OF 04'
    },
    th: {
      'nav.home':'หน้าแรก', 'nav.reel':'โชว์รีล', 'nav.portfolio':'ผลงาน', 'nav.contact':'ติดต่อ',
      'footer.credit':'2026 เบญญาภา วัฒนะเสวี ผลงาน',
      'pagenav.prev':'← ม้วนก่อนหน้า', 'pagenav.next':'ม้วนถัดไป →',
      'slug.fadeIn':'จางเข้า:', 'slug.cutTo':'ตัดเข้าฉาก:', 'slug.fadeOut':'จางออก.',

      'meta.title.index':'เบญญาภา วัฒนะเสวี — พอร์ตโฟลิโอภาพยนตร์',
      'meta.desc.index':'โต๊ะตัดต่อและกองถ่ายภาพยนตร์ — โชว์รีล ผลงาน และข้อมูลติดต่อของนักศึกษาสาขาภาพยนตร์ผู้เชี่ยวชาญด้านการเขียนบท',
      'index.hero.roll':'ROLL 01 PORTFOLIO BENYAPHA',
      'index.hero.title':'Welcome to my feature film.<br>I hope you enjoy the view.',
      'index.hero.sub':'นักเขียนบทและนักศึกษาภาพยนตร์ที่ใช้ชีวิตอยู่ในกองถ่าย เขียนบทให้ทั้งหนังสั้น โฆษณา และซีรีส์ ลงมือทำเองตั้งแต่ร่างแรกจนถึงงานตัดต่อฉบับสมบูรณ์ เรื่องราวคือสิ่งที่ทำให้ฉันสื่อสารความรู้สึกที่แท้จริงถึงผู้คน',
      'index.slate.take':'ฉาก 04 · เทค 02',
      'index.slate.production.label':'การผลิต',
      'index.slate.production.value':'เบญญาภา วัฒนะเสวี — พอร์ตโฟลิโอ 2026',
      'index.slate.role.label':'ผู้กำกับ / บทบาท',
      'index.slate.role.value':'นักเขียนบท ผู้ตัดต่อ ผู้กำกับภาพ นักออกแบบกราฟิก ไฟแสง และ Content Creator',
      'index.slate.scene.label':'ฉาก',
      'index.slate.scene.value':'นักศึกษาสาขาภาพยนตร์',
      'index.skill.1':'การเขียนบท', 'index.skill.2':'บทภาพยนตร์สั้น', 'index.skill.3':'บทโฆษณา',
      'index.skill.4':'การเขียนบทซีรีส์', 'index.skill.5':'งานก่อนถ่ายทำ', 'index.skill.6':'งานหลังถ่ายทำ', 'index.skill.7':'การเล่าเรื่อง',
      'index.cta.watch':'ดูโชว์รีล', 'index.cta.contact':'ติดต่อฉัน',
      'index.showreel.eyebrow':'ROLL 01 · Showreel', 'index.showreel.h2':'Showreel',
      'index.showreel.note':'รวมผลงานตั้งแต่ปี 2025-2026',
      'index.about.eyebrow':'เกี่ยวกับฉัน',
      'index.about.bio':'<p>ดิฉัน นางสาว<strong>เบญญาภา วัฒนะเสวี (เบญ)</strong> นิสิตชั้นปีที่ 4 สาขาสื่อนฤมิต คณะวิทยาการสารสนเทศ มหาวิทยาลัยมหาสารคาม มีความมุ่งมั่นและความหลงใหลในศิลปะการเล่าเรื่องรวมถึงการเขียนบทภาพยนตร์<br>จากประสบการณ์การปฏิบัติงานจริงในกองถ่ายหลากหลายบทบาท ทั้งในส่วนของภาพยนตร์สั้น ซีรีส์<br>และภาพยนตร์โฆษณา ส่งผลให้ดิฉันมีความเข้าใจในกระบวนการผลิตสื่ออย่างครบวงจร ตั้งแต่ขั้นตอนการวางแผน <span class="nowrap">(Pre-production)</span> ไปจนถึงขั้นตอนการขัดเกลาผลงานในกระบวนการหลังการผลิต <span class="nowrap">(Post-production)</span></p><p>ดิฉันมีความตั้งใจอย่างยิ่งที่จะนำทักษะและความคิดสร้างสรรค์ มารังสรรค์ผลงานที่มีคุณภาพเพื่อเข้าถึงอารมณ์และความรู้สึกของผู้ชม พร้อมทั้งเปิดรับการเรียนรู้สิ่งใหม่ ๆ เพื่อร่วมขับเคลื่อนและสร้างสรรค์ผลงานที่มีคุณค่าร่วมกับองค์กรอย่างยั่งยืน</p>',
      'index.about.eduLabel':'การศึกษา',
      'index.about.eduValue':'มหาวิทยาลัยมหาสารคาม<br>ปริญญาตรี สาขาสื่อนฤมิต<br>คณะวิทยาการสารสนเทศ<br>คาดว่าจะสำเร็จการศึกษา:&nbsp;ปี&nbsp;2027',
      'index.about.skillsLabel':'ทักษะ',
      'index.about.softwareLabel':'Software',
      'index.about.skill1':'<strong>การเขียนบทและสร้างสรรค์</strong> — มีจินตนาการสูง ร่วมพัฒนาบทภาพยนตร์และซีรีส์',
      'index.about.skill2':'<strong>การบริหารจัดการกองถ่าย</strong> — ควบคุมงานตามแผน แก้ปัญหาเฉพาะหน้าและช่วยงานส่วนอื่นได้',
      'index.about.skill3':'<strong>การประสานงานนักแสดง</strong> — สื่อสารและบรีฟบทแก่นักแสดงได้อย่างมีประสิทธิภาพ',
      'index.about.skill4':'<strong>ภาวะผู้นำและทีมเวิร์ก</strong> — ปฏิบัติงานร่วมกับผู้อื่นได้ดีทั้งในฐานะผู้นำและผู้ตาม',
      'index.about.skill5':'<strong>การคิดวิเคราะห์</strong> — ประเมินความเป็นไปได้ของงาน และพัฒนาตนเองอย่างต่อเนื่อง',
      'index.footer.roll':'ม้วนที่ 01 จาก 04',

      'meta.title.reel':'โชว์รีล — เบญญาภา วัฒนะเสวี',
      'meta.desc.reel':'รวมผลงานหนังสั้น โฆษณา และบทซีรีส์ โดยเบญญาภา วัฒนะเสวี',
      'reel.eyebrow':'ม้วนที่ 02 · โชว์รีล',
      'reel.h2':'โชว์รีล — ผลงานผ่านกล้องและโต๊ะตัดต่อ',
      'reel.note':'รวมผลงานของฉัน ตั้งแต่หนังสั้นไปจนถึงโฆษณา — คลิกด้านล่างเพื่อรับชม',
      'reel.featured.eyebrow':'แนะนำ',
      'reel.featured.role':'ผู้กำกับและนักเขียนบท',
      'reel.watchBadge':'ดูคลิป',
      'reel.role.01B':'นักเขียนบท ผู้ช่วยผู้กำกับ และผู้กำกับภาพ',
      'reel.role.02A':'นักเขียนบท ผู้ช่วยตัดต่อ และนักแสดง',
      'reel.role.02B':'นักเขียนบทและผู้ช่วยตัดต่อ',
      'reel.role.03A':'นักเขียนบทและโปรดิวเซอร์',
      'reel.role.03B':'นักเขียนบท ผู้กำกับ ผู้กำกับภาพ และผู้ตัดต่อ',
      'reel.role.04A':'นักเขียนบทและผู้กำกับ',
      'reel.role.04B':'นักเขียนบท ผู้กำกับภาพ และผู้ตัดต่อ',
      'reel.role.05A':'นักเขียนบทและผู้กำกับ',
      'reel.role.05B':'นักแสดง (รับบทแม่) และรันเนอร์กองถ่าย',
      'reel.role.05C':'นักเขียนบทสัมภาษณ์ จัดลำดับการถ่ายทำ และปรับสีภาพ',
      'reel.footer.roll':'ม้วนที่ 02 จาก 04',
      'modal.close':'✕ ปิด',
      'modal.link':'เปิดดูต้นฉบับ ↗',

      'meta.title.portfolio':'ผลงาน — เบญญาภา วัฒนะเสวี',
      'meta.desc.portfolio':'คอนแทคชีตภาพนิ่งและเบื้องหลังจากงานผลิตจริง โดยเบญญาภา วัฒนะเสวี',
      'portfolio.eyebrow':'ม้วนที่ 03 · คอนแทคชีต',
      'portfolio.h2':'ผลงานภาพยนตร์และภาพเบื้องหลัง',
      'portfolio.note':'ภาพนิ่งและเบื้องหลังจากผลงานของฉัน ตั้งแต่หนังสั้นไปจนถึงโฆษณา — คลิกด้านล่างเพื่อดูเพิ่มเติม',
      'portfolio.cap.01A':'ผู้กำกับและนักเขียนบท — “Moha”',
      'portfolio.cap.01B':'นักเขียนบท ผู้ช่วยผู้กำกับ และผู้กำกับภาพ — “13°”',
      'portfolio.cap.02A':'นักเขียนบท ผู้ช่วยตัดต่อ และนักแสดง — “Before Blue Skies”',
      'portfolio.cap.02B':'นักเขียนบทและผู้ช่วยตัดต่อ — “Song Phop”',
      'portfolio.cap.03A':'นักเขียนบทและโปรดิวเซอร์ — “Sense”',
      'portfolio.cap.03B':'นักเขียนบท ผู้กำกับ ผู้กำกับภาพ และผู้ตัดต่อ — “Wake Up”',
      'portfolio.cap.04A':'นักเขียนบทและผู้กำกับ — “Bualee”',
      'portfolio.cap.04B':'นักเขียนบท ผู้กำกับภาพ และผู้ตัดต่อ — “Kong Gu”',
      'portfolio.cap.05A':'นักเขียนบทและผู้กำกับ — “Born Again”',
      'portfolio.cap.05B':'นักแสดง (รับบทแม่) และรันเนอร์กองถ่าย — “ซ่อนขวัญ”',
      'portfolio.cap.05C':'นักเขียนบทสัมภาษณ์ จัดลำดับการถ่ายทำ และปรับสีภาพ — “EmergenZ”',
      'portfolio.graphic.eyebrow':'ม้วนที่ 03บี · งานออกแบบกราฟิก',
      'portfolio.graphic.h2':'งานกราฟฟิกที่ออกแบบ',
      'portfolio.graphic.note':'โปสเตอร์และงานกราฟิกที่ฉันออกแบบเอง ตั้งแต่โปสเตอร์หนังไปจนถึงงานภาพนิ่งเดี่ยว',
      'portfolio.photo.eyebrow':'ม้วนที่ 03ซี · ภาพถ่ายและงานปรับสี',
      'portfolio.photo.h2':'ผลงานการถ่ายภาพและการปรับแต่งโทนสี',
      'portfolio.photo.note':'ภาพถ่ายส่วนตัวที่ฉันตัดต่อและปรับสีเอง',
      'portfolio.photo.portrait.eyebrow':'ภาพพอร์เทรต',
      'portfolio.photo.portrait.h3':'ภาพถ่ายพอร์เทรต',
      'portfolio.photo.product.eyebrow':'ภาพอาหารและสินค้า',
      'portfolio.photo.product.h3':'ภาพถ่ายอาหารและสินค้า',
      'portfolio.cert.eyebrow':'ม้วนที่ 03ดี · เกียรติบัตร',
      'portfolio.cert.h2':'เกียรติบัตร',
      'portfolio.cert.note':'รางวัลและเกียรติบัตรจากผลงานและกิจกรรมที่ผ่านมา',
      'portfolio.footer.roll':'ม้วนที่ 03 จาก 04',

      'meta.title.contact':'ติดต่อ — เบญญาภา วัฒนะเสวี',
      'meta.desc.contact':'ช่องทางติดต่อและฟอร์มส่งข้อความถึงเบญญาภา วัฒนะเสวี',
      'contact.eyebrow':'ม้วนที่ 04 · ใบคอลชีท',
      'contact.h2':'ติดต่อฉัน',
      'contact.note':'ส่งข้อความผ่านฟอร์ม หรือติดต่อได้ตามช่องทางด้านล่าง',
      'contact.cs.production':'การผลิต — พอร์ตโฟลิโอ 2026',
      'contact.cs.callTime':'เวลานัดหมาย: เปิดรับทุกเวลา',
      'contact.cs.emailLabel':'อีเมล', 'contact.cs.phoneLabel':'โทรศัพท์', 'contact.cs.locationLabel':'ที่อยู่',
      'contact.cs.locationValue':'กรุงเทพมหานคร ประเทศไทย',
      'contact.form.name':'ชื่อ / โปรดักชัน', 'contact.form.email':'อีเมลตอบกลับ',
      'contact.form.details':'รายละเอียดโปรเจกต์', 'contact.form.submit':'ส่งข้อความ',
      'pagenav.backTo':'กลับไปที่ →',
      'contact.footer.roll':'ม้วนที่ 04 จาก 04',

      'meta.title.work':'ผลงาน — เบญญาภา วัฒนะเสวี',
      'meta.desc.work':'คลิปและภาพเบื้องหลังจากผลงานการผลิตของเบญญาภา วัฒนะเสวี',
      'work.back':'← กลับไปที่ผลงาน',
      'work.title.loading':'กำลังโหลด…',
      'work.gallery.title':'เบื้องหลัง',
      'work.pagenav.backTo':'← กลับไปที่',
      'work.footer.roll':'ม้วนที่ 03 จาก 04'
    }
  };

  function getLang(){
    try { return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'th'; } catch(e){ return 'th'; }
  }

  function applyLang(lang){
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var key = el.getAttribute('data-i18n');
      var dict = I18N[lang] || I18N.en;
      var val = dict[key];
      if(val === undefined) return;
      if(el.tagName === 'META'){ el.setAttribute('content', val); return; }
      if(el.hasAttribute('data-i18n-html')) el.innerHTML = val;
      else el.textContent = val;
    });
    var btn = document.getElementById('langToggle');
    if(btn){
      btn.textContent = lang === 'th' ? 'EN' : 'ไทย';
      btn.setAttribute('aria-label', lang === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย');
    }
    renderWork(lang);
  }

  function setLang(lang){
    try { localStorage.setItem(LANG_KEY, lang); } catch(e){}
    applyLang(lang);
  }

  function toEmbedUrl(url){
    var yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
    if(yt) return 'https://www.youtube.com/embed/' + yt[1];
    var vimeo = url.match(/vimeo\.com\/(\d+)/);
    if(vimeo) return 'https://player.vimeo.com/video/' + vimeo[1];
    var drive = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
    if(drive) return 'https://drive.google.com/file/d/' + drive[1] + '/preview';
    return url;
  }

  function toAutoplayEmbedUrl(url){
    var base = toEmbedUrl(url);
    if(/youtube\.com\/embed\//.test(base)) return base + '?autoplay=1&rel=0';
    if(/player\.vimeo\.com/.test(base)) return base + '?autoplay=1';
    return base;
  }

  var WORKS = {
    '01A': {title:'Moha', role:{en:'Director &amp; Screenwriter', th:'ผู้กำกับและนักเขียนบท'}, video:'https://youtu.be/-hA9V7qIV7M?si=5QX4lIeQNE0R1wL', bts:['images/bts-01a-1.jpg', 'images/bts-01a-2.jpg', 'images/bts-01a-3.jpg', 'images/bts-01a-4.jpg', 'images/bts-01a-5.jpg', 'images/bts-01a-6.jpg', 'images/bts-01a-7.jpg', 'images/bts-01a-8.jpg', 'images/bts-01a-9.jpg', 'images/bts-01a-10.jpg', 'images/bts-01a-11.jpg', 'images/bts-01a-12.jpg', 'images/bts-01a-13.jpg'], detail:{
      en:{ label:'Project', title:'Screenwriter & Director — Short Film Thesis', context:'Project: Moha (โมหะ) · In Post-Production', desc:'Researched target audience insights and developed a production-ready script. Directed the creative vision and co-planned shot sequences with the DoP.' },
      th:{ label:'โปรเจกต์', title:'นักเขียนบทและผู้กำกับ — ภาพยนตร์สั้นวิทยานิพนธ์', context:'โปรเจกต์: Moha (โมหะ) · อยู่ในขั้นตอนหลังการถ่ายทำ', desc:'ศึกษาข้อมูลเชิงลึกของกลุ่มเป้าหมายและพัฒนาบทที่พร้อมสำหรับการถ่ายทำ กำกับทิศทางความคิดสร้างสรรค์และร่วมวางแผนลำดับช็อตกับผู้กำกับภาพ' }
    }},
    '01B': {title:'13°', role:{en:'Screenwriter, Assistant Director &amp; Cinematographer', th:'นักเขียนบท ผู้ช่วยผู้กำกับ และผู้กำกับภาพ'}, video:'https://drive.google.com/file/d/113LkCFDyjXyOsKsUwqEt-iR5pXkdqUEf/view?usp=sharing', bts:['images/bts-01b-1.jpg', 'images/bts-01b-2.jpg', 'images/bts-01b-3.jpg', 'images/bts-01b-4.jpg', 'images/bts-01b-5.jpg', 'images/bts-01b-6.jpg', 'images/bts-01b-7.jpg', 'images/bts-01b-8.jpeg', 'images/bts-01b-9.jpeg', 'images/bts-01b-10.jpeg', 'images/bts-01b-11.jpeg', 'images/bts-01b-12.jpeg', 'images/bts-01b-13.jpeg', 'images/bts-01b-14.jpeg', 'images/bts-01b-15.jpeg', 'images/bts-01b-16.jpeg', 'images/bts-01b-17.jpeg'], detail:{
      en:{ label:'Project', title:'Screenwriter & Assistant Director — Short Film', context:'Project: 13°(เหลือเพียงเราในน่านน้ำ) · Next Frame: Visual Technology for Tourism Movie', desc:'Co-wrote the script utilizing local data to create a tourism-focused narrative. Managed on-set operations, scheduling, and lighting setup with the Director.' },
      th:{ label:'โปรเจกต์', title:'นักเขียนบทและผู้ช่วยผู้กำกับ — ภาพยนตร์สั้น', context:'โปรเจกต์: 13°(เหลือเพียงเราในน่านน้ำ) · Next Frame: เทคโนโลยีภาพเพื่อภาพยนตร์ท่องเที่ยว', desc:'ร่วมเขียนบทโดยใช้ข้อมูลท้องถิ่นเพื่อสร้างเรื่องราวที่เน้นการท่องเที่ยว ดูแลการทำงานหน้ากอง การจัดตารางถ่ายทำ และการจัดไฟร่วมกับผู้กำกับ' }
    }},
    '02A': {title:'Before Blue Skies', role:{en:'Screenwriter, Assistant Editor &amp; Actor', th:'นักเขียนบท ผู้ช่วยตัดต่อ และนักแสดง'}, video:'https://youtu.be/OrUtbmWaH08?si=6Lzd3UWIDn7sTw25', bts:['images/bts-02a-1.jpg', 'images/bts-02a-2.jpg', 'images/bts-02a-3.jpg', 'images/bts-02a-4.jpg', 'images/bts-02a-5.jpg'], detail:{
      en:{ label:'Project', title:'Assistant Series Writer & Assistant Editor — OFOS Next Frame', context:'Project: Before the Sky Turns Blue (ก่อนท้องฟ้าจะเป็นสีคราม) · GMMTV (Series)', desc:'Co-developed a series pitch and learned industry techniques from GMM professional writers. Assisted in editing and color grading to shape the visual pacing and tone.' },
      th:{ label:'โปรเจกต์', title:'ผู้ช่วยเขียนบทซีรีส์และผู้ช่วยตัดต่อ — OFOS Next Frame', context:'โปรเจกต์: Before the Sky Turns Blue (ก่อนท้องฟ้าจะเป็นสีคราม) · GMMTV (ซีรีส์)', desc:'ร่วมพัฒนาพิตช์ซีรีส์และเรียนรู้เทคนิคจากนักเขียนมืออาชีพของ GMM ช่วยงานตัดต่อและปรับสีเพื่อกำหนดจังหวะและโทนภาพ' }
    }},
    '02B': {title:'Song Phop', role:{en:'Screenwriter &amp; Assistant Editor', th:'นักเขียนบทและผู้ช่วยตัดต่อ'}, video:'https://youtu.be/WdcanNO_i-c?si=RVozW0rTOkE28Ona', bts:['images/bts-02b-2.jpg', 'images/bts-02b-3.jpg', 'images/bts-02b-4.jpg', 'images/bts-02b-5.jpg', 'images/bts-02b-6.jpg'], detail:{
      en:{ label:'Project', title:'Screenwriter & Assistant Editor — Feature Film', context:'Project: Song Phop (ส่องภพ) · OFOS Next Frame 12: Lanna Legacy', desc:'Researched cultural details to outline and refine a feature-length screenplay. Organized and sequenced footage during post-production to match the Director’s vision.' },
      th:{ label:'โปรเจกต์', title:'นักเขียนบทและผู้ช่วยตัดต่อ — ภาพยนตร์ขนาดยาว', context:'โปรเจกต์: Song Phop (ส่องภพ) · OFOS Next Frame 12: Lanna Legacy', desc:'ศึกษารายละเอียดเชิงวัฒนธรรมเพื่อวางโครงเรื่องและขัดเกลาบทภาพยนตร์ขนาดยาว จัดเรียงลำดับฟุตเตจในขั้นตอนหลังการถ่ายทำให้ตรงตามวิสัยทัศน์ของผู้กำกับ' }
    }},
    '03A': {title:'Sense', role:{en:'Screenwriter &amp; Producer', th:'นักเขียนบทและโปรดิวเซอร์'}, video:'https://youtu.be/ahm7A6UvPjQ?si=FhUc0-jbHUvv4fBS', bts:['images/bts-03a-1.jpg', 'images/bts-03a-2.jpg', 'images/bts-03a-3.jpg', 'images/bts-03a-4.jpg', 'images/bts-03a-5.jpg', 'images/bts-03a-6.jpg', 'images/bts-03a-7.jpg', 'images/bts-03a-8.jpg'], detail:{
      en:{ label:'Project Overview', title:'Co-Screenwriter & Producer / Production Manager — Short Film', context:'Project: Sense', desc:'A gripping short film marking my first venture into the action genre. I wore dual hats as a co-writer and production manager, executing the logistics of complex action sequences to perfectly realize the director’s visual style. I also contributed to art direction, building and designing the sets, and costume design.' },
      th:{ label:'ภาพรวมโปรเจกต์', title:'ผู้ร่วมเขียนบทและโปรดิวเซอร์ / ผู้จัดการกองถ่าย — ภาพยนตร์สั้น', context:'โปรเจกต์: Sense', desc:'ภาพยนตร์สั้นที่ชวนติดตาม เป็นการก้าวเข้าสู่แนวแอ็กชันครั้งแรกของฉัน ฉันสวมสองบทบาททั้งผู้ร่วมเขียนและผู้จัดการกองถ่าย ดูแลการจัดการฉากแอ็กชันที่ซับซ้อนให้สมบูรณ์ตามสไตล์ภาพของผู้กำกับ นอกจากนี้ยังร่วมงานด้านกำกับศิลป์ สร้างฉากและออกแบบฉาก รวมถึงออกแบบคอสตูมให้ตัวละครด้วย' }
    }},
    '03B': {title:'Wake Up', role:{en:'Screenwriter, Director, Cinematographer &amp; Editor', th:'นักเขียนบท ผู้กำกับ ผู้กำกับภาพ และผู้ตัดต่อ'}, video:'https://youtu.be/8pJExQZFmbs?si=i_ZWzaY5KjiqJt4R', bts:[], detail:{
      en:{ label:'Project', title:'Screenwriter & Director — Short Film', context:'Project: Wake Up', desc:'A solo project I planned and carried out from start to finish — writing the script, designing camera angles, and sequencing every shot. I wrote it as a dialogue-free film and shot it in a static, single-take style. Along the way I handled lighting, camera equipment, editing, and sound design myself, with every step thought through carefully before this piece came together.' },
      th:{ label:'โปรเจกต์', title:'นักเขียนบทและผู้กำกับ — ภาพยนตร์สั้น', context:'โปรเจกต์: Wake Up', desc:'เป็นผลงานเดี่ยวที่ฉันวางแผนและลงมือทำเองทั้งหมด ตั้งแต่การเขียนบท ออกแบบมุมกล้อง ไปจนถึงลำดับภาพ โดยตั้งใจเขียนบทให้เป็นภาพยนตร์ที่ไม่มีบทพูด และถ่ายทำในรูปแบบ Still Shot ทำให้ได้ลงมือทำเองในทุกขั้นตอน ทั้งการจัดแสง การใช้อุปกรณ์ถ่ายทำ ไปจนถึงการตัดต่อและใส่เสียงประกอบ ทุกส่วนต้องผ่านกระบวนการคิดอย่างละเอียด จนออกมาเป็นผลงานชิ้นนี้' }
    }},
    '04A': {title:'Bualee', role:{en:'Screenwriter &amp; Director', th:'นักเขียนบทและผู้กำกับ'}, video:'https://youtu.be/V93zC4UrbhI?si=G-I4OzsEZk0NmcEQ', bts:[], detail:{
      en:{ label:'Awards', title:'Creative Content Award — “Yai Bua Li” (ยายบัวลี)', context:'Bewell Video Commercial · DigiLife Season 2', desc:'Managed the full production pipeline (pre-to-post) for a commercial script. Developed content strategy and collaborated with the team to meet brand goals.' },
      th:{ label:'รางวัล', title:'รางวัลคอนเทนต์สร้างสรรค์ — “ยายบัวลี”', context:'โฆษณา Bewell · DigiLife Season 2', desc:'ดูแลกระบวนการผลิตทั้งหมด (ตั้งแต่ก่อนถึงหลังถ่ายทำ) สำหรับบทโฆษณา วางกลยุทธ์คอนเทนต์และร่วมมือกับทีมเพื่อให้บรรลุเป้าหมายของแบรนด์' }
    }},
    '04B': {title:'Kong Gu', role:{en:'Screenwriter, Cinematographer &amp; Editor', th:'นักเขียนบท ผู้กำกับภาพ และผู้ตัดต่อ'}, video:'https://youtu.be/9r9amCPAONk?si=t9J4Um5JiikURqX5', bts:[], detail:{
      en:{ label:'Project', title:'Screenwriter, Camera 2 & Assistant Editor — Film', context:'Project: Kong Gu', desc:'This was the very first film project I got to work on hands-on, and since it was my first real production experience, I ended up taking on almost every role on set. It became an important lesson that shaped how I have approached both screenwriting and production on every project since.' },
      th:{ label:'โปรเจกต์', title:'นักเขียนบท กล้อง 2 และผู้ช่วยตัดต่อ — ภาพยนตร์', context:'โปรเจกต์: Kong Gu', desc:'เป็นงานภาพยนตร์เรื่องแรกที่ฉันได้ลองลงมือทำจริง และในกองถ่ายฉันได้รับผิดชอบเกือบทุกหน้าที่ เนื่องจากเป็นประสบการณ์งานแรกของฉัน งานชิ้นนี้จึงกลายเป็นบทเรียนสำคัญที่ช่วยพัฒนาทั้งการเขียนบทและการทำงานโปรดักชันในงานอื่นๆ' }
    }},
    '05A': {title:'Born Again', role:{en:'Director &amp; Screenwriter', th:'นักเขียนบทและผู้กำกับ'}, video:'https://youtu.be/-TMjArmLlFY?si=0QHq2_eH3RrGSSyt', bts:[], detail:{
      en:{ label:'Project', title:'Director & Screenwriter — Short Film', context:'Project: Born Again', desc:'A romance-thriller short film — the first I wrote and directed myself, and a major challenge stepping into this role. The process was full of mistakes and on-the-spot problems, which sharpened my decision-making and my ability to think on my feet. Each mistake became a lesson that shaped better work going forward.' },
      th:{ label:'โปรเจกต์', title:'นักเขียนบทและผู้กำกับ — ภาพยนตร์สั้น', context:'โปรเจกต์: Born Again', desc:'ภาพยนตร์สั้นแนวโรแมนติก-ระทึกขวัญเรื่องแรกที่ฉันได้ลงมือเขียนบทและกำกับด้วยตัวเอง นับเป็นความท้าทายครั้งใหญ่ในบทบาทนี้ ตลอดกระบวนการเต็มไปด้วยข้อผิดพลาดและปัญหาเฉพาะหน้ามากมาย ซึ่งฝึกให้ฉันมีทักษะการตัดสินใจและคิดหาทางแก้ไขปัญหาเฉพาะหน้าได้ดีขึ้น ทุกความผิดพลาดกลายเป็นบทเรียนสำคัญที่ช่วยพัฒนางานชิ้นต่อๆ ไปให้ดียิ่งขึ้น' }
    }},
    '05B': {title:'ซ่อนขวัญ', role:{en:'Actress (Mother) &amp; Set Runner', th:'นักแสดง (รับบทแม่) และรันเนอร์กองถ่าย'}, video:'https://youtu.be/-nVAvTxNz60?si=k-MJ6HQlYeW-BSan', bts:[], detail:{
      en:{ label:'Project', title:'Actress (Mother) & Set Runner — Short Film', context:'Project: Son Kwan (ซ่อนขวัญ) · Senior Thesis Film (Year 4)', desc:'Took on the role of the mother in this short film, while also working as a set runner supporting the crew’s day-to-day needs on production. It was a valuable experience that let me observe how a production with a large crew operates — groundwork I’m carrying into planning my own role as director on my thesis film.' },
      th:{ label:'โปรเจกต์', title:'นักแสดง (รับบทแม่) และรันเนอร์กองถ่าย — ภาพยนตร์สั้น', context:'โปรเจกต์: ซ่อนขวัญ · วิทยานิพนธ์ของรุ่นพี่ชั้นปีที่ 4', desc:'รับบทเป็นแม่ในภาพยนตร์สั้นเรื่องนี้ พร้อมทั้งทำหน้าที่รันเนอร์คอยช่วยเหลือสนับสนุนงานต่างๆ ให้ทีมงานตลอดการถ่ายทำ เป็นประสบการณ์ที่ดีมาก ทำให้ได้สังเกตการณ์การทำงานของกองถ่ายที่มีทีมงานขนาดใหญ่ และนำสิ่งที่ได้เรียนรู้มาเป็นการบ้านในการวางแผนตนเองสำหรับการเป็นผู้กำกับในภาพยนตร์วิทยานิพนธ์ของตัวเองต่อไป' }
    }},
    '05C': {title:'EmergenZ', role:{en:'Interview Scriptwriter, Shoot Planner &amp; Colour Grading', th:'นักเขียนบทสัมภาษณ์ จัดลำดับการถ่ายทำ และปรับสีภาพ'}, video:'https://youtu.be/j9fIHr7cglc?si=kKl0lrmqIoN7lC5c', bts:[], detail:{
      en:{ label:'Project', title:'Interview Scriptwriter, Shoot Planner & Colour Grading — Documentary', context:'Project: EmergenZ (Documentary)', desc:'A documentary uncovering the lives of students who study while also volunteering to save lives. I co-wrote the interview script, sequenced the shoot, and handled the colour grading. My first documentary project — it showed me how documentary filmmaking demands deep research and probing questions, giving me real experience working with real people instead of actors.' },
      th:{ label:'โปรเจกต์', title:'นักเขียนบทสัมภาษณ์ จัดลำดับการถ่ายทำ และปรับสีภาพ — สารคดี', context:'โปรเจกต์: EmergenZ (สารคดี)', desc:'สารคดีที่ตีแผ่ชีวิตของนิสิตที่ทำหน้าที่เรียนและช่วยชีวิตผู้คนไปด้วย ในงานนี้ได้ร่วมคิดบทสัมภาษณ์ จัดลำดับการถ่ายทำ และปรับสีภาพ (Colour Grading) เป็นงานสารคดีเรื่องแรกที่ได้ถ่ายทำ ทำให้เห็นกระบวนการถ่ายทำสารคดีที่ต้องศึกษาและถามข้อมูลเชิงลึก ได้ทั้งประสบการณ์และเรียนรู้การทำงานร่วมกับผู้อื่นที่ไม่ใช่นักแสดง แต่เป็นชีวิตจริง' }
    }}
  };

  var workDetail = document.getElementById('workDetail');
  var workId = workDetail ? new URLSearchParams(location.search).get('id') : null;
  var work = workId ? WORKS[workId] : null;
  var wTitle = document.getElementById('workTitle');
  var wCaption = document.getElementById('workCaption');
  var wVideo = document.getElementById('workVideoBody');
  var wLink = document.getElementById('workLink');
  var wGallery = document.getElementById('workGallery');
  var wGalleryGrid = document.getElementById('workGalleryGrid');
  var wDetailBlock = document.getElementById('workDetailBlock');
  var wDetailLabel = document.getElementById('workDetailLabel');
  var wDetailTitle = document.getElementById('workDetailTitle');
  var wDetailContext = document.getElementById('workDetailContext');
  var wDetailDesc = document.getElementById('workDetailDesc');
  var wVideoRendered = false;
  var wGalleryRendered = false;

  function renderWork(lang){
    if(!workDetail) return;

    if(work){
      document.title = work.title + (lang === 'th' ? ' — เบญญาภา วัฒนะเสวี' : ' — Benyapha Watthanasewe');
      if(wTitle) wTitle.textContent = work.title;
      if(wCaption) wCaption.textContent = work.role[lang];
      if(wVideo && !wVideoRendered){
        wVideo.innerHTML = '';
        if(work.video){
          var wIframe = document.createElement('iframe');
          wIframe.src = toEmbedUrl(work.video);
          wIframe.allow = 'autoplay; fullscreen; picture-in-picture';
          wIframe.allowFullscreen = true;
          wVideo.appendChild(wIframe);
        } else {
          var wEmpty = document.createElement('p');
          wEmpty.className = 'video-modal-empty';
          wEmpty.textContent = STR.clipSoon[lang];
          wVideo.appendChild(wEmpty);
        }
        wVideoRendered = true;
      } else if(wVideo && !work.video){
        var existingEmpty = wVideo.querySelector('.video-modal-empty');
        if(existingEmpty) existingEmpty.textContent = STR.clipSoon[lang];
      }
      if(wLink){
        if(work.video){ wLink.href = work.video; wLink.style.display = ''; }
        else { wLink.style.display = 'none'; }
      }
      if(wDetailBlock){
        if(work.detail){
          var d = work.detail[lang];
          if(wDetailLabel) wDetailLabel.textContent = d.label;
          if(wDetailTitle) wDetailTitle.textContent = d.title;
          if(wDetailContext) wDetailContext.textContent = d.context;
          if(wDetailDesc) wDetailDesc.textContent = d.desc;
          wDetailBlock.style.display = '';
        } else {
          wDetailBlock.style.display = 'none';
        }
      }
      if(wGallery && wGalleryGrid && !wGalleryRendered){
        wGalleryGrid.innerHTML = '';
        if(work.bts && work.bts.length){
          work.bts.forEach(function(src){
            var img = document.createElement('img');
            img.src = src; img.alt = ''; img.loading = 'lazy';
            img.className = 'zoomable';
            img.setAttribute('role', 'button');
            img.setAttribute('tabindex', '0');
            wGalleryGrid.appendChild(img);
          });
          wGallery.style.display = '';
        } else {
          wGallery.style.display = 'none';
        }
        wGalleryRendered = true;
      }
    } else {
      if(wTitle) wTitle.textContent = STR.workNotFound[lang];
      if(wCaption) wCaption.textContent = STR.workNotFoundDesc[lang];
      if(wVideo) wVideo.style.display = 'none';
      if(wLink) wLink.style.display = 'none';
      if(wDetailBlock) wDetailBlock.style.display = 'none';
      if(wGallery) wGallery.style.display = 'none';
    }
  }

  var modal = document.getElementById('videoModal');
  if(modal){
    var modalBody = modal.querySelector('.video-modal-body');
    var modalCaption = modal.querySelector('.video-modal-caption');
    var modalLink = modal.querySelector('.video-modal-link');
    var modalGallery = modal.querySelector('.video-modal-gallery');
    var modalGalleryGrid = modal.querySelector('.video-modal-gallery-grid');
    var closeBtn = modal.querySelector('.video-modal-close');
    var lastTrigger = null;

    function openModal(trigger){
      var lang = getLang();
      var url = trigger.getAttribute('data-video');
      var caption = trigger.getAttribute('data-caption-' + lang) || trigger.getAttribute('data-caption-en') || '';
      modalBody.innerHTML = '';
      if(url){
        var iframe = document.createElement('iframe');
        iframe.src = toAutoplayEmbedUrl(url);
        iframe.allow = 'autoplay; fullscreen; picture-in-picture';
        iframe.allowFullscreen = true;
        modalBody.appendChild(iframe);
      } else {
        var p = document.createElement('p');
        p.className = 'video-modal-empty';
        p.textContent = STR.clipSoon[lang];
        modalBody.appendChild(p);
      }
      modalCaption.textContent = caption;
      if(modalLink){
        if(url){ modalLink.href = url; modalLink.style.display = ''; }
        else { modalLink.removeAttribute('href'); modalLink.style.display = 'none'; }
      }
      if(modalGallery && modalGalleryGrid){
        var bts = (trigger.getAttribute('data-bts') || '').split(',').map(function(s){ return s.trim(); }).filter(Boolean);
        modalGalleryGrid.innerHTML = '';
        if(bts.length){
          bts.forEach(function(src){
            var img = document.createElement('img');
            img.src = src;
            img.alt = '';
            img.loading = 'lazy';
            modalGalleryGrid.appendChild(img);
          });
          modalGallery.style.display = '';
        } else {
          modalGallery.style.display = 'none';
        }
      }
      lastTrigger = trigger;
      modal.classList.add('open');
      document.body.classList.add('modal-open');
      closeBtn.focus();
    }

    function closeModal(){
      modal.classList.remove('open');
      document.body.classList.remove('modal-open');
      modalBody.innerHTML = '';
      if(lastTrigger) lastTrigger.focus();
    }

    document.querySelectorAll('[data-video-trigger]').forEach(function(trigger){
      trigger.addEventListener('click', function(){ openModal(trigger); });
      trigger.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          openModal(trigger);
        }
      });
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e){ if(e.target === modal) closeModal(); });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  }

  var imageModal = document.getElementById('imageModal');
  if(imageModal){
    var imageModalImg = document.getElementById('imageModalImg');
    var imageModalClose = imageModal.querySelector('.image-modal-close');
    var lastImageTrigger = null;

    function openImageModal(trigger){
      imageModalImg.src = trigger.src;
      imageModalImg.alt = trigger.alt;
      lastImageTrigger = trigger;
      imageModal.classList.add('open');
      document.body.classList.add('modal-open');
      imageModalClose.focus();
    }

    function closeImageModal(){
      imageModal.classList.remove('open');
      document.body.classList.remove('modal-open');
      if(lastImageTrigger) lastImageTrigger.focus();
    }

    document.addEventListener('click', function(e){
      var trigger = e.target.closest('.zoomable');
      if(trigger) openImageModal(trigger);
    });
    document.addEventListener('keydown', function(e){
      if(e.key !== 'Enter' && e.key !== ' ') return;
      var trigger = e.target.closest('.zoomable');
      if(trigger){
        e.preventDefault();
        openImageModal(trigger);
      }
    });

    imageModalClose.addEventListener('click', closeImageModal);
    imageModal.addEventListener('click', function(e){ if(e.target === imageModal) closeImageModal(); });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && imageModal.classList.contains('open')) closeImageModal();
    });
  }

  var langToggle = document.getElementById('langToggle');
  if(langToggle){
    langToggle.addEventListener('click', function(){
      setLang(getLang() === 'th' ? 'en' : 'th');
    });
  }

  applyLang(getLang());
})();
