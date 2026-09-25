// The original catalog plus the branches visible in the supplied/reference wheel.
// IDs include the full ancestry: repeated labels intentionally remain distinct.
const families = [
  { label: 'Anger', hindi: 'गुस्सा', color: '#ed806e', pale: '#f8d3d8', description: 'A response to a boundary, need, or expectation that feels crossed.', example: ['I feel angry because my boundaries were ignored.', 'मेरी सीमाओं को नज़रअंदाज़ किया गया, इसलिए मुझे गुस्सा आ रहा है।'], recognize: 'You may notice tension, heat, or an urge to argue.', actions: ['Pause before responding; give your body a moment to settle.', 'Name the boundary or need, then ask for one specific change.'], groups: [
    ['Hurt', 'आहत', 'Something has touched a tender place.', 'I felt hurt when my friend dismissed what mattered to me.', 'जब मेरे दोस्त ने मेरी बात को महत्व नहीं दिया, तो मुझे ठेस लगी।', 'Notice a mix of sadness and defensiveness.', 'Tell someone what hurt using an “I felt…” sentence.', [
      ['Embarrassed', 'शर्मिंदा', 'I felt embarrassed when my mistake was pointed out in front of everyone.', 'सबके सामने मेरी गलती बताई गई, तो मुझे शर्मिंदगी हुई।', 'You may blush or want to hide from attention.'],
      ['Devastated', 'बुरी तरह आहत', 'I felt devastated when a relationship I valued ended.', 'एक अहम रिश्ता खत्म होने पर मैं बुरी तरह टूट गया।', 'The loss may feel overwhelming and hard to absorb.']]],
    ['Threatened', 'खतरा महसूस होना', 'Something important to you feels at risk.', 'I felt threatened when someone tried to take credit for my work.', 'जब किसी ने मेरे काम का श्रेय लेने की कोशिश की, तो मुझे अपना स्थान खतरे में लगा।', 'Notice alertness, comparison, or a need to defend yourself.', 'Separate what is happening now from what you fear could happen.', [
      ['Insecure', 'असुरक्षित', 'I felt insecure when I compared my progress with someone else’s.', 'किसी और की तरक्की से अपनी तुलना करके मुझे असुरक्षा महसूस हुई।', 'You may seek reassurance or doubt your place.'],
      ['Jealous', 'ईर्ष्या', 'I felt jealous when my friend spent more time with someone else.', 'मेरा दोस्त किसी और के साथ ज़्यादा समय बिताने लगा, तो मुझे ईर्ष्या हुई।', 'You may fear losing a valued connection.']]],
    ['Hateful', 'गहरी नफ़रत', 'Intense anger may make another person feel entirely bad.', 'I felt a surge of hatred after being repeatedly mistreated.', 'बार-बार बुरा व्यवहार होने पर मेरे मन में गहरी नफ़रत उठी।', 'Notice harsh, all-or-nothing thoughts about someone.', 'Create some distance before choosing how to respond.', [
      ['Resentful', 'मन में नाराज़गी', 'I felt resentful when I kept doing more than my share.', 'अपने हिस्से से ज़्यादा काम करते रहने पर मेरे मन में नाराज़गी भर गई।', 'You may keep returning to an old unfairness.'],
      ['Violated', 'सीमा का उल्लंघन', 'I felt violated when someone read my private messages.', 'किसी ने मेरे निजी संदेश पढ़े, तो मुझे लगा कि मेरी निजता का उल्लंघन हुआ।', 'You may feel exposed, unsafe, or protective of your space.']]],
    ['Mad', 'नाराज़', 'Strong irritation is asking for your attention.', 'I felt mad when someone broke a promise again.', 'किसी ने फिर से अपना वादा तोड़ा, तो मुझे बहुत गुस्सा आया।', 'You may speak sharply or feel restless.', 'Take a short break before discussing what happened.', [
      ['Furious', 'बहुत क्रोधित', 'I felt furious when I was blamed for something I did not do.', 'जो मैंने किया ही नहीं, उसका दोष मिलने पर मुझे बहुत गुस्सा आया।', 'You may feel a strong surge of energy and an urge to shout.'],
      ['Enraged', 'प्रचंड गुस्सा', 'I felt enraged when someone deliberately damaged my belongings.', 'किसी ने जानबूझकर मेरा सामान खराब किया, तो मैं गुस्से से भर गया।', 'It may be difficult to pause or think beyond the immediate event.']]],
    ['Aggressive', 'आक्रामक', 'Anger may come with an urge to push back forcefully.', 'I felt ready to argue when the discussion turned personal.', 'बातचीत में निजी बातें आने लगीं, तो मेरा मन लड़ने को हुआ।', 'Notice a raised voice, clenched hands, or an urge to confront.', 'Step away from the conflict until you can speak without threats.', [
      ['Provoked', 'उकसाया हुआ', 'I felt provoked when someone kept teasing me after I asked them to stop.', 'मना करने के बाद भी कोई चिढ़ाता रहा, तो मुझे उकसाया हुआ महसूस हुआ।', 'Your reaction may build with each repeated comment.'],
      ['Hostile', 'विरोध से भरा', 'I felt hostile toward the person who kept undermining me.', 'जो व्यक्ति बार-बार मुझे नीचा दिखाता था, उसके प्रति मेरे मन में विरोध भर गया।', 'You may interpret their actions as a challenge or attack.']]],
    ['Frustrated', 'झुंझलाया हुआ', 'Something is blocking what you are trying to do.', 'I felt frustrated when repeated delays stopped my work.', 'बार-बार देरी से मेरा काम रुका, तो मुझे झुंझलाहट हुई।', 'Notice impatience, repeated attempts, or a feeling of being stuck.', 'Identify one small part of the problem you can influence.', [
      ['Infuriated', 'बेहद नाराज़', 'I felt infuriated when the same avoidable problem happened again.', 'वही टाली जा सकने वाली समस्या फिर हुई, तो मुझे बेहद गुस्सा आया।', 'A repeated obstacle may make your anger spike.'],
      ['Irritated', 'चिढ़ा हुआ', 'I felt irritated by the constant interruptions.', 'लगातार टोके जाने से मुझे चिढ़ हो रही थी।', 'Small disruptions may feel unusually hard to tolerate.']]],
    ['Distant', 'दूर-दूर', 'You may be pulling away to protect yourself.', 'I felt distant after an unresolved argument.', 'बहस का समाधान न होने पर मुझे रिश्ते में दूरी महसूस हुई।', 'Notice shorter replies or less willingness to connect.', 'Decide whether you need a little space or a calm conversation.', [
      ['Withdrawn', 'खुद में सिमटा', 'I withdrew from the conversation because I felt hurt.', 'आहत होने के कारण मैंने बातचीत से खुद को अलग कर लिया।', 'You may stop sharing or avoid company.'],
      ['Suspicious', 'शक', 'I felt suspicious when the explanation kept changing.', 'बार-बार सफाई बदलने पर मुझे शक हुआ।', 'You may search for hidden motives or inconsistencies.']]],
    ['Critical', 'आलोचनात्मक', 'Your attention may be fixed on faults or unmet standards.', 'I felt critical when the team ignored an agreed standard.', 'टीम ने तय मानक को नज़रअंदाज़ किया, तो मेरा ध्यान उसकी कमियों पर अटक गया।', 'Notice frequent fault-finding or harsh judgments.', 'Describe the specific behavior without labeling the whole person.', [
      ['Skeptical', 'संदेह', 'I felt skeptical about a promise that sounded too easy.', 'बहुत आसान लगने वाले वादे पर मुझे संदेह हुआ।', 'You may want more evidence before trusting a claim.'],
      ['Sarcastic', 'व्यंग्यात्मक', 'I wanted to make a sarcastic remark instead of saying I was upset.', 'अपनी नाराज़गी बताने के बजाय मेरा मन ताना मारने को हुआ।', 'Humor may be covering irritation or hurt.']]]
  ]},
  { label: 'Disgust', hindi: 'घृणा', color: '#62cbd0', pale: '#c4f0ef', description: 'A response to something that feels deeply unpleasant or against your values.', example: ['I felt disgusted by the way someone was treated.', 'किसी के साथ ऐसा व्यवहार देखकर मुझे घृणा हुई।'], recognize: 'You may recoil, feel queasy, or want distance.', actions: ['Give yourself permission to step back from what feels unpleasant.', 'Name the value or boundary you want to protect.'], groups: [
    ['Disapproval', 'असहमति', 'Something clashes with what you believe is acceptable.', 'I disapproved of the way the decision excluded others.', 'जिस तरह फैसले में दूसरों को बाहर रखा गया, उससे मैं असहमत था।', 'You may feel a firm inner “this is not okay.”', 'Explain which action concerns you and why.', [
      ['Judgmental', 'दोष ढूँढने वाला', 'I caught myself judging someone before hearing their reasons.', 'उनकी वजह सुनने से पहले ही मैं उनके बारे में राय बना रहा था।', 'You may turn one action into a broad judgment about a person.'],
      ['Loathing', 'तीव्र घृणा', 'I felt loathing toward the repeated cruelty I witnessed.', 'बार-बार क्रूरता देखकर मेरे मन में तीव्र घृणा उठी।', 'You may feel strong rejection and an urge to get away.']]],
    ['Disappointed', 'निराश', 'What happened fell short of what you hoped for.', 'I felt disappointed when a trusted person acted unfairly.', 'एक भरोसेमंद व्यक्ति ने अन्याय किया, तो मुझे निराशा हुई।', 'Notice a drop in energy or trust after an expectation is unmet.', 'Acknowledge the expectation before deciding what to do next.', [
      ['Repugnant', 'घोर अप्रिय', 'The cruel joke felt repugnant to me.', 'वह क्रूर मज़ाक मुझे बेहद घिनौना लगा।', 'Something may feel strongly offensive to your values.'],
      ['Revolted', 'घिन', 'I felt revolted by the deliberately humiliating comments.', 'जानबूझकर अपमानित करने वाली टिप्पणियाँ सुनकर मुझे घिन आई।', 'You may turn away or feel physically unsettled.']]],
    ['Awful', 'बहुत बुरा', 'The experience feels deeply unpleasant.', 'I felt awful after witnessing someone being humiliated.', 'किसी का अपमान होते देखकर मुझे बहुत बुरा लगा।', 'You may feel unsettled and want the situation to stop.', 'Move to a calmer space and name what disturbed you.', [
      ['Revulsion', 'घृणा की तीव्र लहर', 'I felt a wave of revulsion when I saw the spoiled food.', 'खराब खाना देखकर मुझे तेज़ घिन आई।', 'Your body may pull away before you put the feeling into words.'],
      ['Detestable', 'बेहद नापसंद', 'I found the deliberate bullying detestable.', 'जानबूझकर किसी को सताना मुझे बेहद घिनौना लगा।', 'You may feel strong moral rejection of an action.']]],
    ['Avoidance', 'बचने की इच्छा', 'You want distance from an uncomfortable experience.', 'I wanted to avoid a place where I had been treated badly.', 'जहाँ मेरे साथ बुरा व्यवहार हुआ था, वहाँ जाने से मैं बचना चाहता था।', 'Notice postponing, leaving, or changing the subject.', 'Ask whether distance protects a boundary or delays a manageable task.', [
      ['Aversion', 'अरुचि', 'I felt an aversion to joining another hostile discussion.', 'एक और कटु बहस में शामिल होने से मुझे अरुचि हुई।', 'You may feel a clear urge not to approach something.'],
      ['Hesitant', 'हिचकिचाहट', 'I felt hesitant about returning after an uncomfortable experience.', 'असहज अनुभव के बाद वापस जाने में मुझे हिचकिचाहट हुई।', 'You may pause repeatedly before deciding to engage.']]]
  ]},
  { label: 'Sad', hindi: 'उदास', color: '#b79ad9', pale: '#e5d9ef', description: 'A response to loss, disconnection, or something that matters being absent.', example: ['I feel sad because I miss someone important to me.', 'किसी अपने की याद आ रही है, इसलिए मैं उदास हूँ।'], recognize: 'You may notice heaviness, tears, or less energy.', actions: ['Make room for the feeling without judging yourself for it.', 'Choose one gentle form of support: rest, company, or a small routine.'], groups: [
    ['Guilty', 'अपराधबोध', 'You feel you have acted against your values.', 'I felt guilty after speaking unkindly to my friend.', 'अपने दोस्त से कठोरता से बात करने के बाद मुझे अपराधबोध हुआ।', 'You may replay an action and wish you had chosen differently.', 'If appropriate, make a specific apology or repair.', [
      ['Remorseful', 'पछतावा', 'I felt remorseful after breaking someone’s trust.', 'किसी का भरोसा तोड़ने के बाद मुझे पछतावा हुआ।', 'You may want to take responsibility and make amends.'],
      ['Ashamed', 'शर्म', 'I felt ashamed and worried that one mistake defined me.', 'मुझे शर्म आई और लगा कि एक गलती ही मेरी पहचान बन गई है।', 'Your thoughts may shift from “I did wrong” to “I am wrong.”']]],
    ['Abandoned', 'छोड़ दिया गया', 'A connection or source of support feels absent.', 'I felt abandoned when no one checked in during a hard week.', 'मुश्किल हफ्ते में किसी ने हाल नहीं पूछा, तो मुझे अकेला छोड़ दिया गया महसूस हुआ।', 'You may feel unimportant or worry that support will disappear.', 'Reach out to one person with a clear request for connection.', [
      ['Ignored', 'अनदेखा', 'I felt ignored when my question went unanswered.', 'मेरे सवाल का जवाब नहीं मिला, तो मुझे अनदेखा महसूस हुआ।', 'You may feel invisible or unheard.'],
      ['Victimized', 'अन्याय का शिकार', 'I felt victimized when I was repeatedly singled out unfairly.', 'बार-बार बेवजह निशाना बनाए जाने पर मुझे अन्याय का शिकार महसूस हुआ।', 'You may feel singled out and unable to get a fair hearing.']]],
    ['Despair', 'गहरी निराशा', 'It is difficult to imagine things becoming better.', 'I felt despair when every effort seemed to lead nowhere.', 'हर कोशिश बेकार लगने लगी, तो मुझे गहरी निराशा हुई।', 'You may struggle to see options or a way forward.', 'Share how hard this feels with someone you trust; focus on the next small step.', [
      ['Powerless', 'बेबस', 'I felt powerless when the decision was made without me.', 'मेरे बिना फैसला कर लिया गया, तो मुझे बेबसी महसूस हुई।', 'You may feel you have no say or influence.'],
      ['Vulnerable', 'नाज़ुक और असुरक्षित', 'I felt vulnerable when I shared something deeply personal.', 'बहुत निजी बात साझा करते समय मुझे नाज़ुक और असुरक्षित महसूस हुआ।', 'You may feel exposed and especially sensitive to others’ responses.']]],
    ['Depressed', 'बहुत उदास', 'Here this word describes a low feeling, not a diagnosis.', 'I felt very low and ordinary tasks seemed harder today.', 'आज मैं बहुत उदास था और रोज़मर्रा के काम भी मुश्किल लगे।', 'You may notice low motivation or less enjoyment.', 'Try one manageable act of care; seek support if this persists or disrupts daily life.', [
      ['Inferior', 'कमतर', 'I felt inferior when I measured myself against everyone else.', 'सबसे अपनी तुलना करने पर मुझे खुद को कमतर महसूस हुआ।', 'You may overlook your strengths and focus on perceived shortcomings.'],
      ['Empty', 'खालीपन', 'I felt empty even though the day was full of activity.', 'दिन भर व्यस्त रहने के बावजूद मुझे अंदर खालीपन महसूस हुआ।', 'You may feel disconnected from things that usually matter.']]],
    ['Lonely', 'अकेलापन', 'You are missing the kind of connection you need.', 'I felt lonely even while surrounded by people.', 'लोगों के बीच रहते हुए भी मुझे अकेलापन महसूस हुआ।', 'You may long to be understood rather than simply accompanied.', 'Send a small, specific invitation to someone you feel comfortable with.', [
      ['Abandoned', 'साथ छूटना', 'I felt abandoned when everyone left without checking on me.', 'सब बिना मेरा हाल पूछे चले गए, तो मुझे लगा मेरा साथ छोड़ दिया गया।', 'Loneliness may come with a sense of being left behind.'],
      ['Isolated', 'अलग-थलग', 'I felt isolated while working alone for many days.', 'कई दिनों तक अकेले काम करने से मुझे अलग-थलग महसूस हुआ।', 'You may have little contact or feel outside a group.']]],
    ['Bored', 'ऊबा हुआ', 'You are missing interest, variety, or meaningful engagement.', 'I felt bored doing the same task for hours.', 'घंटों एक ही काम करके मैं ऊब गया।', 'Your attention may drift or time may feel slow.', 'Try a small change in task, setting, or level of challenge.', [
      ['Apathetic', 'उत्साहहीन', 'I felt apathetic and could not find much interest in the choices.', 'मुझमें उत्साह नहीं था और किसी विकल्प में रुचि नहीं हो रही थी।', 'You may feel little motivation to engage.'],
      ['Indifferent', 'उदासीन', 'I felt indifferent about an event I normally enjoyed.', 'जिस कार्यक्रम का मैं आम तौर पर आनंद लेता था, उसके प्रति मैं उदासीन था।', 'Something may feel neither appealing nor upsetting.']]]
  ]},
  { label: 'Happy', hindi: 'खुश', color: '#eed36c', pale: '#f7eec0', description: 'A sense of pleasure, connection, or things feeling right.', example: ['I feel happy sharing a good moment with someone I care about.', 'किसी अपने के साथ अच्छा पल बाँटकर मुझे खुशी हो रही है।'], recognize: 'You may notice warmth, ease, a smile, or energy.', actions: ['Pause and notice what is making this moment meaningful.', 'Savor it, share it, or make room for more of what supports it.'], groups: [
    ['Optimistic', 'आशावादी', 'You can imagine a positive possibility ahead.', 'I felt optimistic after seeing a little progress.', 'थोड़ी तरक्की देखकर मुझे आगे की उम्मीद जगी।', 'You may notice possibilities more readily than obstacles.', 'Pair your hope with one realistic next step.', [
      ['Inspired', 'प्रेरित', 'I felt inspired after hearing someone’s creative idea.', 'किसी का रचनात्मक विचार सुनकर मुझे प्रेरणा मिली।', 'You may feel an urge to create or try something meaningful.'],
      ['Open', 'खुले मन वाला', 'I felt open to trying a different way of doing things.', 'काम करने का नया तरीका अपनाने के लिए मेरा मन खुला था।', 'You may feel curious and willing to consider possibilities.']]],
    ['Intimate', 'नज़दीकी', 'You feel emotionally close and able to be yourself.', 'I felt close to my friend during an honest conversation.', 'खुलकर बात करते समय मुझे अपने दोस्त से गहरी नज़दीकी महसूस हुई।', 'You may feel safe sharing your inner experience.', 'Appreciate the connection while respecting both people’s boundaries.', [
      ['Playful', 'चंचल', 'I felt playful while laughing over a silly game.', 'एक मज़ेदार खेल पर हँसते हुए मेरा मन चंचल हो गया।', 'You may feel lighthearted and ready to experiment.'],
      ['Sensitive', 'संवेदनशील', 'I felt tender and sensitive during a heartfelt conversation.', 'दिल से हुई बातचीत में मुझे कोमलता और संवेदनशीलता महसूस हुई।', 'You may be especially aware of subtle feelings and connection.']]],
    ['Peaceful', 'शांत', 'There is a sense of ease or inner quiet.', 'I felt peaceful while sitting quietly after a busy day.', 'व्यस्त दिन के बाद चुपचाप बैठकर मुझे शांति मिली।', 'Your breathing or thoughts may feel less hurried.', 'Notice the conditions that help you feel at ease.', [
      ['Hopeful', 'उम्मीद से भरा', 'I felt hopeful when we began to understand each other.', 'जब हम एक-दूसरे को समझने लगे, तो मेरे मन में उम्मीद जगी।', 'You may see a way forward even with uncertainty.'],
      ['Loving', 'स्नेह से भरा', 'I felt loving while caring for someone important to me.', 'किसी अपने का ध्यान रखते हुए मेरा मन स्नेह से भर गया।', 'You may feel warmth and a wish for someone’s wellbeing.']]],
    ['Powerful', 'सशक्त', 'You feel able to act and influence what matters.', 'I felt powerful when I spoke up for my needs.', 'अपनी ज़रूरतों के लिए आवाज़ उठाने पर मुझे सशक्त महसूस हुआ।', 'You may stand taller or feel more decisive.', 'Use that energy for a considered action that respects others.', [
      ['Provocative', 'चुनौती देने वाला', 'I felt bold enough to challenge an accepted idea.', 'मुझे किसी प्रचलित विचार को चुनौती देने का साहस महसूस हुआ।', 'You may want to stir thought or challenge expectations.'],
      ['Courageous', 'साहसी', 'I felt courageous taking a step that mattered despite my fear.', 'डर के बावजूद ज़रूरी कदम उठाकर मुझे साहस महसूस हुआ।', 'You may feel both fear and willingness to act.']]],
    ['Accepted', 'स्वीकृत', 'You feel welcomed and valued as you are.', 'I felt accepted when the group made room for my perspective.', 'समूह ने मेरे नज़रिए को जगह दी, तो मुझे अपनापन महसूस हुआ।', 'You may feel less pressure to hide or prove yourself.', 'Notice who helps you feel welcome and nurture those connections.', [
      ['Fulfilled', 'तृप्त', 'I felt fulfilled after doing work that mattered to me.', 'अपने लिए अर्थपूर्ण काम करके मुझे संतोष मिला।', 'You may feel that your actions align with what matters.'],
      ['Respected', 'सम्मानित', 'I felt respected when my opinion was heard carefully.', 'मेरी राय ध्यान से सुनी गई, तो मुझे सम्मानित महसूस हुआ।', 'You may feel your voice and boundaries have value.']]],
    ['Proud', 'गर्व', 'You recognize effort, growth, or an achievement.', 'I felt proud of completing something difficult.', 'मुश्किल काम पूरा करके मुझे खुद पर गर्व हुआ।', 'You may want to acknowledge or share what you accomplished.', 'Name the effort or choice you appreciate in yourself.', [
      ['Confident', 'आत्मविश्वासी', 'I felt confident because I had prepared well.', 'अच्छी तैयारी के कारण मुझे आत्मविश्वास महसूस हुआ।', 'You may trust your ability to respond, even without certainty.'],
      ['Important', 'महत्वपूर्ण', 'I felt important when my contribution made a difference.', 'मेरे योगदान से फर्क पड़ा, तो मुझे अपना महत्व महसूस हुआ।', 'You may feel that your presence or effort matters.']]],
    ['Interested', 'रुचि', 'Something is drawing your attention.', 'I felt interested when I discovered a new subject.', 'नया विषय जानने पर मेरी रुचि जागी।', 'You may ask questions or naturally pay closer attention.', 'Follow one question and give yourself time to explore.', [
      ['Inquisitive', 'जिज्ञासु', 'I felt inquisitive and wanted to understand how it worked.', 'मुझे जिज्ञासा हुई कि यह कैसे काम करता है।', 'You may want to ask questions and investigate.'],
      ['Amused', 'मनोरंजित', 'I felt amused by a friend’s gentle joke.', 'दोस्त के हल्के-फुल्के मज़ाक से मुझे हँसी आई।', 'You may smile or laugh at something pleasantly unexpected.']]],
    ['Joyful', 'आनंदित', 'You feel a bright sense of delight.', 'I felt joyful when we celebrated together.', 'साथ मिलकर जश्न मनाते समय मुझे आनंद हुआ।', 'You may feel uplifted and want to share the moment.', 'Let yourself enjoy the moment without needing to earn it.', [
      ['Ecstatic', 'बेहद आनंदित', 'I felt ecstatic when I heard the wonderful news.', 'बहुत अच्छी खबर सुनकर मैं खुशी से झूम उठा।', 'Your delight may feel intense and energizing.'],
      ['Liberated', 'मुक्त', 'I felt liberated after letting go of an unnecessary expectation.', 'एक अनावश्यक अपेक्षा छोड़ने पर मुझे आज़ादी महसूस हुई।', 'You may notice relief, space, and greater freedom to choose.']]]
  ]},
  { label: 'Surprise', hindi: 'हैरानी', color: '#74bce0', pale: '#cfe7f4', description: 'A response to something you did not expect.', example: ['I felt surprised when the day took an unexpected turn.', 'दिन ने अचानक नया मोड़ लिया, तो मुझे हैरानी हुई।'], recognize: 'You may pause, widen your eyes, or need time to take things in.', actions: ['Give yourself a moment to absorb what happened.', 'Check what you know before deciding what it means.'], groups: [
    ['Excited', 'उत्साहित', 'You feel energized by what is happening or coming next.', 'I felt excited before trying something new.', 'कुछ नया आज़माने से पहले मुझे उत्साह महसूस हुआ।', 'You may feel restless in a pleasant, expectant way.', 'Channel the energy into one useful preparation or action.', [
      ['Energetic', 'ऊर्जावान', 'I felt energetic and ready to begin the project.', 'मुझे ऊर्जा महसूस हुई और मैं परियोजना शुरू करने के लिए तैयार था।', 'You may want to move, speak, or get started.'],
      ['Eager', 'उत्सुक', 'I felt eager to hear what would happen next.', 'आगे क्या होगा, यह सुनने के लिए मैं उत्सुक था।', 'Your attention may keep moving toward an anticipated experience.']]],
    ['Amazed', 'चकित', 'Something has exceeded what you expected.', 'I felt amazed by what the team achieved together.', 'टीम ने मिलकर जो किया, उसे देखकर मैं चकित रह गया।', 'You may stop and take in something with wonder.', 'Take a moment to notice what impressed you.', [
      ['Awe', 'विस्मय', 'I felt awe while looking at the vast night sky.', 'विशाल रात के आसमान को देखकर मुझे विस्मय हुआ।', 'You may feel small in a meaningful way before something vast.'],
      ['Astonished', 'अचंभित', 'I felt astonished by the completely unexpected result.', 'बिल्कुल अनपेक्षित नतीजा देखकर मैं अचंभित रह गया।', 'You may need a moment to reconcile events with your expectations.']]],
    ['Confused', 'उलझन', 'What you are experiencing does not yet make sense.', 'I felt confused when two people gave opposite instructions.', 'दो लोगों ने उलटे निर्देश दिए, तो मैं उलझ गया।', 'You may hesitate or replay information without clarity.', 'Ask one clarifying question or write down what you know.', [
      ['Perplexed', 'हैरान-परेशान', 'I felt perplexed when the explanation raised more questions.', 'समझाने पर और सवाल उठे, तो मैं हैरान-परेशान हो गया।', 'You may be unable to fit the pieces into a clear picture.'],
      ['Disillusioned', 'मोहभंग', 'I felt disillusioned when the reality did not match the promise.', 'हकीकत वादे जैसी नहीं निकली, तो मेरा मोहभंग हुआ।', 'A belief or expectation may feel newly shaken.']]],
    ['Startled', 'चौंका हुआ', 'Something unexpected has caught your attention suddenly.', 'I felt startled by a sudden knock in the quiet room.', 'शांत कमरे में अचानक दस्तक से मैं चौंक गया।', 'You may jump, tense up, or briefly feel your heart race.', 'Look around and orient yourself to what is happening now.', [
      ['Dismayed', 'हताश और हैरान', 'I felt dismayed by the sudden cancellation of our plans.', 'हमारी योजना अचानक रद्द होने पर मुझे हैरानी और हताशा हुई।', 'Surprise may arrive with disappointment or worry.'],
      ['Shocked', 'स्तब्ध', 'I felt shocked when I heard the unexpected news.', 'अचानक मिली खबर सुनकर मैं स्तब्ध रह गया।', 'You may feel briefly numb or struggle to find words.']]]
  ]},
  { label: 'Fear', hindi: 'डर', color: '#eda571', pale: '#f9dfc8', description: 'A response to uncertainty or a perceived threat.', example: ['I feel afraid because I do not know what will happen next.', 'आगे क्या होगा, यह न जानने से मुझे डर लग रहा है।'], recognize: 'You may notice tension, a racing mind, or an urge to escape.', actions: ['Notice your surroundings and distinguish current facts from predictions.', 'Choose one manageable step or ask someone trustworthy for support.'], groups: [
    ['Scared', 'डरा हुआ', 'Something feels unsafe or frightening.', 'I felt scared when I heard a strange noise outside.', 'बाहर अजीब आवाज़ सुनकर मुझे डर लगा।', 'You may freeze, tense up, or want to leave.', 'Check your immediate surroundings and move somewhere safe if needed.', [
      ['Terrified', 'बहुत भयभीत', 'I felt terrified when I thought I was in danger.', 'खुद को खतरे में समझकर मैं बहुत भयभीत हो गया।', 'Fear may feel intense enough to make thinking clearly difficult.'],
      ['Frightened', 'भयभीत', 'I felt frightened walking through an unfamiliar dark place.', 'अनजान अँधेरी जगह से गुज़रते समय मुझे डर लगा।', 'You may be extra alert to sounds and movement.']]],
    ['Anxious', 'चिंतित', 'Your mind is anticipating something difficult or uncertain.', 'I felt anxious while waiting for an important reply.', 'एक ज़रूरी जवाब का इंतज़ार करते समय मुझे चिंता हुई।', 'You may rehearse possibilities or find it hard to settle.', 'Separate a solvable task from a prediction you cannot settle right now.', [
      ['Overwhelmed', 'बहुत दबाव में', 'I felt overwhelmed by too many tasks arriving at once.', 'एक साथ बहुत सारे काम आने से मुझे बहुत दबाव महसूस हुआ।', 'You may struggle to choose where to start.'],
      ['Worried', 'फिक्रमंद', 'I felt worried about how tomorrow’s conversation would go.', 'कल की बातचीत कैसी होगी, इसकी मुझे फिक्र थी।', 'Your thoughts may repeatedly return to a possible problem.']]],
    ['Insecure', 'असुरक्षित', 'You are unsure of your ability, place, or support.', 'I felt insecure joining a group where I knew no one.', 'जहाँ मैं किसी को नहीं जानता था, उस समूह में मुझे असुरक्षा महसूस हुई।', 'You may second-guess yourself or look for reassurance.', 'Recall one concrete strength or ask for the information you need.', [
      ['Inadequate', 'पर्याप्त न लगना', 'I felt inadequate when I faced a task I had never tried.', 'पहली बार कोई काम करते समय मुझे लगा कि मैं पर्याप्त सक्षम नहीं हूँ।', 'You may confuse being new at something with being incapable.'],
      ['Inferior', 'कमतर', 'I felt inferior beside people who seemed more experienced.', 'ज़्यादा अनुभवी लोगों के साथ मुझे खुद को कमतर महसूस हुआ।', 'You may compare your uncertainties with others’ visible strengths.']]],
    ['Submissive', 'दबा हुआ', 'You may be yielding because asserting yourself feels risky.', 'I agreed even though I wanted to say no.', 'ना कहना चाहता था, फिर भी मैंने हाँ कह दी।', 'You may silence your preferences to avoid conflict.', 'Practice expressing one small preference in a situation that feels safe.', [
      ['Worthless', 'बेकार महसूस करना', 'After repeated criticism, I felt as if I had no value.', 'बार-बार आलोचना के बाद मुझे लगा जैसे मेरा कोई मूल्य नहीं है।', 'Harsh self-judgments may obscure your worth; the feeling is not a fact.'],
      ['Insignificant', 'महत्वहीन', 'I felt insignificant when no one considered my needs.', 'किसी ने मेरी ज़रूरतों पर ध्यान नहीं दिया, तो मुझे महत्वहीन महसूस हुआ।', 'You may feel your needs or presence do not count.']]],
    ['Rejected', 'अस्वीकृत', 'You feel unwanted or excluded from a connection.', 'I felt rejected when I was left out of the invitation.', 'मुझे निमंत्रण में शामिल नहीं किया गया, तो मुझे ठुकराया हुआ महसूस हुआ।', 'You may withdraw or question whether you belong.', 'Look for the specific facts and connect with someone who values you.', [
      ['Inadequate', 'खुद में कमी लगना', 'After being turned down, I felt as though I was not enough.', 'मना किए जाने के बाद मुझे लगा जैसे मुझमें ही कमी है।', 'You may interpret one rejection as a judgment of your whole self.'],
      ['Alienated', 'पराया', 'I felt alienated when nobody seemed to understand my experience.', 'किसी ने मेरा अनुभव नहीं समझा, तो मुझे परायापन महसूस हुआ।', 'You may feel outside the group even when physically present.']]],
    ['Humiliated', 'अपमानित', 'Your dignity feels hurt, especially in front of others.', 'I felt humiliated when I was mocked in the meeting.', 'बैठक में मेरा मज़ाक उड़ाया गया, तो मुझे अपमानित महसूस हुआ।', 'You may feel exposed, small, or eager to disappear.', 'Seek a supportive perspective and decide what boundary needs stating.', [
      ['Disrespected', 'अनादर', 'I felt disrespected when someone talked over me repeatedly.', 'बार-बार मेरी बात काटी गई, तो मुझे अनादर महसूस हुआ।', 'You may feel your voice or boundaries have been dismissed.'],
      ['Ridiculed', 'उपहास का शिकार', 'I felt ridiculed when others laughed at my sincere question.', 'मेरे सच्चे सवाल पर लोग हँसे, तो मुझे उपहास का शिकार महसूस हुआ।', 'You may become reluctant to speak or be noticed.']]]
  ]}
];

// Each entry is [family, group, Hindi group, definition, [leaf, Hindi, definition]...].
// The linked site provides the wheel labels and its check-in guide, but no word
// definitions. The definitions below are original explanatory copy.
const referenceBranches = [
  ['Happy', 'Respected', 'सम्मानित', 'Feeling that your dignity, views, or contribution are valued.',
    ['Inspired', 'प्रेरित', 'Moved toward an idea or action by something meaningful.'], ['Valued', 'मूल्यवान', 'Feeling that your presence or contribution matters.']],
  ['Happy', 'Grateful', 'कृतज्ञ', 'Appreciating a kindness, opportunity, or good thing in your life.',
    ['Hopeful', 'आशावान', 'Sensing that a welcome possibility may still be ahead.'], ['Loving', 'स्नेहपूर्ण', 'Feeling warm care and connection toward someone.']],
  ['Happy', 'Enthusiastic', 'उत्साही', 'Feeling lively interest and motivation about something.',
    ['Impassioned', 'जोश से भरा', 'Feeling strongly moved and invested in what matters to you.'], ['Passionate', 'उत्कट', 'Feeling deep enthusiasm or devotion toward someone or something.']],
  ['Happy', 'Creative', 'रचनात्मक', 'Feeling open to imagining, making, or trying something new.',
    ['Energetic', 'ऊर्जावान', 'Feeling ready to move, act, or engage.'], ['Successful', 'सफल', 'Feeling satisfaction that your effort reached a goal.']],
  ['Happy', 'Pleased', 'प्रसन्न', 'Feeling quietly glad about how something turned out.',
    ['Delighted', 'बहुत प्रसन्न', 'Feeling bright pleasure at something welcome.'], ['Amused', 'मनोरंजित', 'Finding something pleasantly funny or entertaining.']],
  ['Happy', 'Confident', 'आत्मविश्वासी', 'Trusting your ability to meet a situation, even without certainty.',
    ['Courageous', 'साहसी', 'Feeling willing to act despite fear or uncertainty.'], ['Proud', 'गर्वित', 'Feeling satisfaction in your effort, growth, or achievement.']],
  ['Happy', 'Interested', 'रुचि', 'Feeling drawn to pay attention and learn more.',
    ['Curious', 'जिज्ञासु', 'Wanting to explore or understand something unfamiliar.'], ['Inquisitive', 'खोजी', 'Wanting to ask questions and investigate further.']],
  ['Happy', 'Playful', 'खिलंदड़ा', 'Feeling light and open to fun or spontaneity.',
    ['Cheeky', 'शरारती', 'Feeling mischievous in a lighthearted way.'], ['Aroused', 'उत्तेजित', 'Feeling physically or emotionally stimulated; context determines whether this is sexual.']],
  ['Happy', 'Trusting', 'भरोसेमंद महसूस करना', 'Feeling able to rely on someone or something.',
    ['Powerful', 'सशक्त', 'Feeling capable of influencing what happens next.'], ['Accepted', 'स्वीकृत', 'Feeling welcomed as you are.']],
  ['Happy', 'Content', 'संतुष्ट', 'Feeling at ease with the present moment.',
    ['Satisfied', 'तृप्त', 'Feeling that a need or expectation has been met.'], ['Peaceful', 'शांत', 'Feeling calm and free from immediate inner conflict.']],
  ['Happy', 'Joyful', 'आनंदित', 'Feeling bright pleasure and gladness.',
    ['Ecstatic', 'परमानंदित', 'Feeling an intense surge of joy.'], ['Overjoyed', 'अत्यंत खुश', 'Feeling so happy that the delight seems hard to contain.']],
  ['Anger', 'Irritable', 'चिड़चिड़ा', 'Feeling easily bothered or quick to react to small disruptions.',
    ['Aggravated', 'और चिढ़ा हुआ', 'Feeling more irritated because a problem continues or grows.'], ['Irked', 'खिन्न', 'Feeling mildly annoyed by something specific.']],
  ['Anger', 'Annoyed', 'नाराज़', 'Feeling bothered by something inconvenient or unwelcome.',
    ['Furious', 'प्रचंड क्रोधित', 'Feeling very intense anger about what happened.'], ['Bothered', 'परेशान', 'Feeling unsettled or irritated by something.']],
  ['Anger', 'Envious', 'ईर्ष्यालु', 'Wanting an advantage or experience someone else has.',
    ['Bitter', 'कटु', 'Feeling lingering anger about perceived unfairness.'], ['Jealous', 'ईर्ष्यालु', 'Fearing the loss of a valued bond or position to someone else.']],
  ['Anger', 'Bitter', 'कटु', 'Carrying lasting anger after hurt or disappointment.',
    ['Violated', 'सीमा टूटी महसूस करना', 'Feeling that an important boundary or right was crossed.'], ['Indignant', 'अन्याय से क्रोधित', 'Feeling anger at treatment you see as unfair.']],
  ['Anger', 'Critical', 'आलोचनात्मक', 'Focusing on faults or unmet standards.',
    ['Dismissive', 'उपेक्षापूर्ण', 'Feeling inclined to brush aside another view or concern.'], ['Skeptical', 'संदेहपूर्ण', 'Doubting a claim until there is stronger reason to trust it.']],
  ['Anger', 'Aggressive', 'आक्रामक', 'Feeling an urge to push back forcefully.',
    ['Hostile', 'विरोधपूर्ण', 'Feeling openly opposed to a person or situation.'], ['Provoked', 'उकसाया हुआ', 'Feeling pushed toward anger by repeated or pointed actions.']],
  ['Anger', 'Mad', 'गुस्से में', 'Feeling strong anger about a situation.',
    ['Infuriated', 'बेहद गुस्से में', 'Feeling intensely angry, often after a repeated frustration.'], ['Furious', 'प्रचंड क्रोधित', 'Feeling a powerful surge of anger.']],
  ['Anger', 'Disrespected', 'अनादर महसूस करना', 'Feeling that your dignity, voice, or boundary was disregarded.',
    ['Humiliated', 'अपमानित', 'Feeling painfully exposed or put down, especially before others.'], ['Ridiculed', 'उपहास का शिकार', 'Feeling mocked for something sincere or personal.']],
  ['Anger', 'Let Down', 'निराश किया गया', 'Feeling disappointed because someone did not meet an important expectation.',
    ['Resentful', 'मन में रोष', 'Holding anger about a hurt or imbalance that has not been resolved.'], ['Betrayed', 'विश्वासघात महसूस करना', 'Feeling hurt and angry after a trusted person breaks your trust.']],
  ['Anger', 'Frustrated', 'झुंझलाया हुआ', 'Feeling blocked from something you are trying to do.',
    ['Rageful', 'उग्र गुस्से में', 'Feeling anger so intense it is difficult to contain.'], ['Annoyed', 'नाराज़', 'Feeling bothered by an obstacle or repeated inconvenience.']],
  ['Sad', 'Hurt', 'आहत', 'Feeling emotional pain after loss, rejection, or unkind treatment.',
    ['Fragile', 'नाज़ुक', 'Feeling especially tender or easily hurt right now.'], ['Victimized', 'अन्याय का शिकार', 'Feeling repeatedly targeted or treated unfairly.']],
  ['Sad', 'Depressed', 'बहुत उदास', 'Feeling persistently low or weighed down; the word here describes a feeling, not a diagnosis.',
    ['Worthless', 'बेकार महसूस करना', 'Feeling as though you have no value; this feeling is not a fact.'], ['Unmotivated', 'प्रेरणा की कमी', 'Finding it hard to begin or care about a task.']],
  ['Sad', 'Guilty', 'अपराधबोध', 'Feeling that your action went against your values or hurt someone.',
    ['Remorseful', 'पछतावे में', 'Regretting an action and wanting to make amends.'], ['Ashamed', 'शर्मिंदा', 'Feeling that a mistake reflects badly on your whole self.']],
  ['Sad', 'Sorrow', 'शोक', 'Feeling deep sadness about loss or suffering.',
    ['Grief', 'गहरा शोक', 'The pain and adjustment that follow a meaningful loss.'], ['Despair', 'गहरी निराशा', 'Feeling unable to see a hopeful way forward.']],
  ['Sad', 'Numb', 'सुन्न', 'Feeling emotionally muted or disconnected, sometimes after stress.',
    ['Empty', 'खालीपन', 'Feeling an absence of meaning or emotional connection.'], ['Powerless', 'बेबस', 'Feeling unable to influence an important outcome.']],
  ['Sad', 'Lonely', 'अकेला', 'Missing the connection or understanding you need.',
    ['Abandoned', 'छोड़ दिया गया', 'Feeling that needed support or connection has gone away.'], ['Isolated', 'अलग-थलग', 'Feeling cut off from others, physically or emotionally.']],
  ['Fear', 'Fearful', 'भयभीत', 'Sensing danger or a possible threat.',
    ['Frightened', 'डरा हुआ', 'Feeling fear in response to a perceived threat.'], ['Nervous', 'घबराया हुआ', 'Feeling unsettled while anticipating an uncertain situation.']],
  ['Fear', 'Anxious', 'चिंतित', 'Anticipating a difficult or uncertain outcome.',
    ['Panicked', 'घबराहट से भर गया', 'Feeling a sudden, intense surge of fear.'], ['Overwhelmed', 'अभिभूत', 'Feeling that current demands exceed what you can manage right now.']],
  ['Fear', 'Insecure', 'असुरक्षित', 'Doubting your ability, place, or support.',
    ['Inadequate', 'पर्याप्त न लगना', 'Feeling unable to meet a demand or standard.'], ['Inferior', 'कमतर', 'Feeling less capable or worthy than others.']],
  ['Fear', 'Rejected', 'अस्वीकृत', 'Feeling unwanted or excluded from a connection.',
    ['Excluded', 'बाहर रखा गया', 'Feeling left out of a group or opportunity.'], ['Persecuted', 'सताया हुआ', 'Feeling persistently targeted or unfairly treated.']],
  ['Fear', 'Helpless', 'असहाय', 'Feeling unable to protect yourself or change what is happening.',
    ['Lost', 'दिशाहीन', 'Feeling unsure where to turn or what to do next.'], ['Insignificant', 'महत्वहीन', 'Feeling that your needs or presence do not count.']],
  ['Fear', 'Worried', 'फिक्रमंद', 'Thinking repeatedly about a possible problem.',
    ['Threatened', 'खतरे में', 'Feeling that something important to you may be harmed.'], ['Intimidated', 'भयभीत और दबा हुआ', 'Feeling less able to speak or act because someone or something seems powerful.']],
  ['Disgust', 'Contempt', 'तिरस्कार', 'Feeling that someone or something is beneath respect.',
    ['Disdain', 'तिरस्कार', 'Feeling dismissive scorn toward someone or something.'], ['Scornful', 'उपहासपूर्ण', 'Feeling contempt that may come out as mocking.']],
  ['Disgust', 'Repelled', 'घिन से दूर हटना', 'Feeling a strong urge to move away from something unpleasant.',
    ['Horrified', 'स्तब्ध और भयभीत', 'Feeling shocked and deeply disturbed by what you perceive.'], ['Nauseated', 'मिचली आना', 'Feeling sickened, physically or figuratively, by something.']],
  ['Disgust', 'Disapproving', 'असहमति जताना', 'Feeling that an action conflicts with your values or standards.',
    ['Judgmental', 'निर्णयात्मक', 'Making a broad negative judgment before fully understanding.'], ['Embarrassed', 'शर्मिंदा', 'Feeling self-conscious after an awkward or exposed moment.']],
  ['Disgust', 'Disappointed', 'निराश', 'Feeling let down when reality falls short of hope.',
    ['Hesitant', 'हिचकिचाता हुआ', 'Feeling unsure whether to approach or proceed.'], ['Appalled', 'स्तब्ध और क्षुब्ध', 'Feeling shocked by something you find deeply wrong.']],
  ['Surprise', 'Excited', 'उत्साहित', 'Feeling energized by something new or anticipated.',
    ['Eager', 'उत्सुक', 'Looking forward keenly to what comes next.'], ['Amazed', 'चकित', 'Feeling wonder because something exceeds expectations.']],
  ['Surprise', 'Awe', 'विस्मय', 'Feeling wonder before something vast or extraordinary.',
    ['Astonished', 'अचंभित', 'Feeling strongly surprised by an unexpected event.'], ['Shocked', 'स्तब्ध', 'Feeling stunned by sudden or unexpected news.']],
  ['Surprise', 'Confused', 'उलझन', 'Feeling unable to make sense of what is happening yet.',
    ['Perplexed', 'हैरान-परेशान', 'Feeling puzzled because the pieces do not fit together.'], ['Disillusioned', 'मोहभंग', 'Feeling disappointed when reality challenges a trusted belief.']],
  ['Surprise', 'Startled', 'चौंका हुआ', 'Reacting suddenly to something unexpected.',
    ['Dismayed', 'हताश और हैरान', 'Feeling unsettled disappointment at an unwelcome surprise.'], ['Moved', 'भावविभोर', 'Feeling emotionally touched by something meaningful.']]
];

const referenceContexts = {
  'Happy/Respected': ['my idea was heard in the meeting', 'बैठक में मेरी बात सुनी गई'],
  'Happy/Grateful': ['a friend helped me through a hard day', 'एक दोस्त ने मुश्किल दिन में मेरा साथ दिया'],
  'Happy/Enthusiastic': ['we began a project I care about', 'हमने मेरे प्रिय काम की शुरुआत की'],
  'Happy/Creative': ['I found a new way to solve the problem', 'मुझे समस्या हल करने का नया तरीका मिला'],
  'Happy/Pleased': ['the day went better than I expected', 'दिन मेरी उम्मीद से बेहतर गुज़रा'],
  'Happy/Confident': ['my preparation helped me face the challenge', 'मेरी तैयारी ने चुनौती का सामना करने में मदद की'],
  'Happy/Interested': ['someone introduced me to a new subject', 'किसी ने मुझे नया विषय बताया'],
  'Happy/Playful': ['we shared a lighthearted moment', 'हमने साथ में हल्का-फुल्का पल बिताया'],
  'Happy/Trusting': ['someone kept an important promise', 'किसी ने अपना अहम वादा निभाया'],
  'Happy/Content': ['I could rest without rushing to the next task', 'मैं अगले काम की जल्दी किए बिना आराम कर सका'],
  'Happy/Joyful': ['we celebrated good news together', 'हमने अच्छी खबर का साथ में जश्न मनाया'],
  'Anger/Irritable': ['small interruptions kept breaking my focus', 'छोटी-छोटी रुकावटें मेरा ध्यान तोड़ती रहीं'],
  'Anger/Annoyed': ['someone ignored my request again', 'किसी ने फिर मेरी बात अनसुनी की'],
  'Anger/Envious': ['someone else received the opportunity I wanted', 'किसी और को वह अवसर मिला जो मैं चाहता था'],
  'Anger/Bitter': ['the unfair situation went unresolved', 'अन्याय वाली बात का समाधान नहीं हुआ'],
  'Anger/Critical': ['the same avoidable mistake happened again', 'वही टाली जा सकने वाली गलती फिर हुई'],
  'Anger/Aggressive': ['the discussion turned into a personal attack', 'बातचीत निजी हमले में बदल गई'],
  'Anger/Mad': ['I was blamed for something I did not do', 'जो मैंने नहीं किया उसका दोष मुझे दिया गया'],
  'Anger/Disrespected': ['someone mocked me in front of others', 'किसी ने सबके सामने मेरा मज़ाक उड़ाया'],
  'Anger/Let Down': ['a person I trusted broke their promise', 'जिस पर भरोसा था उसने वादा तोड़ा'],
  'Anger/Frustrated': ['repeated delays stopped my work', 'बार-बार की देरी से मेरा काम रुका'],
  'Sad/Hurt': ['my concern was dismissed', 'मेरी चिंता को अनदेखा किया गया'],
  'Sad/Depressed': ['even ordinary tasks felt unusually hard', 'रोज़मर्रा के काम भी असामान्य रूप से मुश्किल लगे'],
  'Sad/Guilty': ['I spoke more harshly than I intended', 'मैंने चाहने से अधिक कठोर बात कही'],
  'Sad/Sorrow': ['I thought about someone I had lost', 'मैंने खोए हुए अपने किसी प्रिय व्यक्ति को याद किया'],
  'Sad/Numb': ['too much happened at once to take in', 'एक साथ बहुत कुछ हुआ और समझना मुश्किल लगा'],
  'Sad/Lonely': ['I wanted to talk and found no one nearby', 'मैं बात करना चाहता था पर कोई पास नहीं था'],
  'Fear/Fearful': ['I heard an unfamiliar sound outside', 'मुझे बाहर अनजानी आवाज़ सुनाई दी'],
  'Fear/Anxious': ['I waited for an important answer', 'मैं एक ज़रूरी जवाब का इंतज़ार कर रहा था'],
  'Fear/Insecure': ['I joined a group where I knew no one', 'मैं ऐसे समूह में गया जहाँ किसी को नहीं जानता था'],
  'Fear/Rejected': ['I was left out of the invitation', 'मुझे निमंत्रण से बाहर रखा गया'],
  'Fear/Helpless': ['a decision affecting me was made without me', 'मुझसे जुड़ा फैसला मेरे बिना हुआ'],
  'Fear/Worried': ['I imagined what might go wrong tomorrow', 'मैं कल क्या गलत हो सकता है यह सोचता रहा'],
  'Disgust/Contempt': ['I watched someone repeatedly treat others cruelly', 'मैंने किसी को बार-बार दूसरों से क्रूरता करते देखा'],
  'Disgust/Repelled': ['I encountered something deeply unpleasant', 'मेरे सामने कुछ बहुत अप्रिय आया'],
  'Disgust/Disapproving': ['I saw someone ignore an agreed boundary', 'मैंने किसी को तय सीमा की अनदेखी करते देखा'],
  'Disgust/Disappointed': ['reality fell short of a promise', 'हकीकत किए गए वादे से कम निकली'],
  'Surprise/Excited': ['a new opportunity appeared unexpectedly', 'अचानक एक नया अवसर आया'],
  'Surprise/Awe': ['I looked up at the vast night sky', 'मैंने विशाल रात के आसमान को देखा'],
  'Surprise/Confused': ['I received two opposite explanations', 'मुझे दो उलटी बातें बताई गईं'],
  'Surprise/Startled': ['a sudden sound broke the silence', 'अचानक एक आवाज़ ने सन्नाटा तोड़ा']
};
const firstSteps = {
  Happy: 'Take a moment to appreciate what feels good.',
  Anger: 'Notice the boundary or expectation that feels crossed.',
  Sad: 'Give the feeling some room and seek support if it helps.',
  Fear: 'Check what is happening now and identify one small step.',
  Disgust: 'Step back and name the value or boundary involved.',
  Surprise: 'Pause before deciding what the event means.'
};
for (const [familyLabel, groupLabel, groupHindi, definition, ...sourceLeaves] of referenceBranches) {
  const family = families.find(item => item.label === familyLabel);
  const existing = family.groups.find(group => group[0] === groupLabel);
  const [context, hindiContext] = referenceContexts[`${familyLabel}/${groupLabel}`];
  const example = `I felt ${groupLabel.toLowerCase()} when ${context}.`;
  const hindiExample = `जब ${hindiContext}, मुझे ${groupHindi} महसूस हुआ।`;
  const action = firstSteps[familyLabel];
  const group = existing || [groupLabel, groupHindi, definition, example, hindiExample, family.recognize, action, []];
  if (!existing) family.groups.push(group);
  else group[2] = definition;
  for (const [leafLabel, hindi, meaning] of sourceLeaves) {
    const leaf = group[7].find(item => item[0] === leafLabel);
    if (leaf) { leaf[5] = meaning; continue; }
    group[7].push([leafLabel, hindi,
      `I felt ${leafLabel.toLowerCase()} when ${context}.`,
      `जब ${hindiContext}, मुझे ${hindi} महसूस हुआ।`, family.recognize, meaning]);
  }
}

const slug = value => value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
export const emotions = [];
let angle = -30;
const leafCount = families.reduce((sum, family) => sum + family.groups.reduce((count, group) => count + group[7].length, 0), 0);
const leafSpan = 360 / leafCount;
for (const family of families) {
  const familyId = slug(family.label);
  const end = angle + family.groups.reduce((sum, group) => sum + group[7].length * leafSpan, 0);
  emotions.push({ id: familyId, label: family.label, hindi: family.hindi, family: familyId, parent: null, depth: 0, start: angle, end, color: family.color, description: family.description, examples: [family.example, [family.groups[0][3], family.groups[0][4]]], recognize: family.recognize, actions: family.actions });
  for (const [label, hindi, description, en, hi, recognize, action, leaves] of family.groups) {
    const groupId = `${familyId}/${slug(label)}`;
    const group = { id: groupId, label, hindi, family: familyId, parent: familyId, depth: 1, start: angle, end: angle + leaves.length * leafSpan, color: family.color, description, examples: [[en, hi], family.example], recognize, actions: [action, ...family.actions.slice(0, 1)] };
    emotions.push(group);
    for (const [leafLabel, leafHindi, leafEn, leafHi, leafRecognize, leafDefinition] of leaves) {
      emotions.push({ id: `${groupId}/${slug(leafLabel)}`, label: leafLabel, hindi: leafHindi, family: familyId, parent: groupId, depth: 2, start: angle, end: angle + leafSpan, color: family.pale, description: leafDefinition || leafRecognize, examples: [[leafEn, leafHi], [en, hi]], recognize: leafRecognize, actions: [action, ...family.actions.slice(0, 1)] });
      angle += leafSpan;
    }
  }
}
export const emotionById = new Map(emotions.map(emotion => [emotion.id, emotion]));
export const roots = emotions.filter(emotion => emotion.depth === 0);
export function rotationFor(current, emotion) {
  const target = 270 - (emotion.start + emotion.end) / 2;
  const delta = ((target - current + 180) % 360 + 360) % 360 - 180;
  return current + delta;
}
export function emotionPath(emotion) {
  const names = [emotion.label];
  let parent = emotion.parent;
  while (parent) { const item = emotionById.get(parent); names.unshift(item.label); parent = item.parent; }
  return names.join(' / ');
}
