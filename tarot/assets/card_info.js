const card_info = [
    {
        "name": "大阿卡纳",
        "folder": "akana",
        "cards": [
            {
                "name": "愚人",
                "name_english": "The Fool",
                "image_file": "fool",
                "symbol": "O",
                "title": ["愚", "人"],
                "keywords": ["开始", "自由", "天真", "流浪"],
                "annotations": {
                    "normal": "象征全新的开始与自由的旅程，鼓励以天真无邪的心态拥抱未知，勇敢开启冒险。",
                    "reversed": "表示缺乏方向感，决策轻率，需警惕冲动行为导致的混乱。"
                }
            },
            {
                "name": "魔术师",
                "name_english": "The Magician",
                "image_file": "magician",
                "symbol": "I",
                "title": ["术", "士"],
                "keywords": ["观察", "开始", "创造"],
                "annotations": {
                    "normal": "代表通过敏锐观察与创造力开启新项目，善于利用现有资源达成目标。",
                    "reversed": "暗示计划不周，缺乏实际行动力，需提升专注与执行力。"
                }
            },
            {
                "name": "女教主",
                "name_english": "The High Priestess",
                "image_file": "high-priestess",
                "symbol": "II",
                "title": ["教", "主"],
                "keywords": ["等待", "智慧", "理性", "消极", "静止"],
                "annotations": {
                    "normal": "象征内在智慧与理性，鼓励耐心等待时机，进行深度思考与自我探索。",
                    "reversed": "表示过度消极，犹豫不决，需主动打破停滞状态，采取行动。"
                }
            },
            {
                "name": "皇后",
                "name_english": "The Empress",
                "image_file": "empress",
                "symbol": "III",
                "title": ["皇", "后"],
                "keywords": ["高贵", "热情", "丰收"],
                "annotations": {
                    "normal": "代表丰饶与热情，象征创造力和慷慨，带来和谐与繁荣。",
                    "reversed": "表示情绪化或过度放纵，需平衡热情与理性，回归内在平静。"
                }
            },
            {
                "name": "皇帝",
                "name_english": "The Emperor",
                "image_file": "emperor",
                "symbol": "IV",
                "title": ["皇", "帝"],
                "keywords": ["权力", "威严", "支配", "消极"],
                "annotations": {
                    "normal": "象征权威与秩序，代表稳固的权力结构和坚定的决策能力。",
                    "reversed": "表示过度控制或专制，需学会灵活与合作，避免压制他人。"
                }
            },
            {
                "name": "教皇",
                "name_english": "The Hierophant",
                "image_file": "hierophant",
                "symbol": "V",
                "title": ["教", "皇"],
                "keywords": ["宗教", "传统", "援助", "仪式"],
                "annotations": {
                    "normal": "代表传统与精神指引，强调仪式感和寻求智慧支持的重要性。",
                    "reversed": "暗示僵化教条，需突破传统束缚，寻找更个人化的灵性道路。"
                }
            },
            {
                "name": "情侣",
                "name_english": "The Lovers",
                "image_file": "lovers",
                "symbol": "VI",
                "title": ["情", "侣"],
                "keywords": ["选择", "爱情", "性爱", "结合", "浪漫"],
                "annotations": {
                    "normal": "象征重要的选择与结合，代表爱情、浪漫关系的建立与承诺。",
                    "reversed": "表示关系中的冲突或选择困难，需重新审视价值观与情感需求。"
                }
            },
            {
                "name": "战车",
                "name_english": "The Chariot",
                "image_file": "chariot",
                "symbol": "VII",
                "title": ["战", "车"],
                "keywords": ["意志", "自律", "胜利", "旅程", "空虚"],
                "annotations": {
                    "normal": "代表意志力与自律，象征通过努力获得胜利，掌控人生方向。",
                    "reversed": "表示缺乏方向或过度竞争，需调整心态，避免空虚的胜利。"
                }
            },
            {
                "name": "力量",
                "name_english": "The Strength",
                "image_file": "strength",
                "symbol": "VIII",
                "title": ["力", "量"],
                "keywords": ["力量", "勇气", "信心", "耐心"],
                "annotations": {
                    "normal": "象征内在力量与勇气，强调以耐心和信心克服挑战。",
                    "reversed": "表示缺乏自信，过度依赖外力，需培养内在韧性。"
                }
            },
            {
                "name": "隐士",
                "name_english": "The Hermit",
                "image_file": "hermit",
                "symbol": "IX",
                "title": ["隐", "士"],
                "keywords": ["内敛", "自省", "孤独", "引导"],
                "annotations": {
                    "normal": "代表内省与孤独，鼓励通过自我反思获得智慧与指引。",
                    "reversed": "表示逃避社交或过度封闭，需适时与外界建立联系。"
                }
            },
            {
                "name": "命运之轮",
                "name_english": "Wheel of Fortune",
                "image_file": "fortune-wheel",
                "symbol": "X",
                "title": ["命", "运", "之", "轮"],
                "keywords": ["契机", "转变", "进展", "运气"],
                "annotations": {
                    "normal": "象征命运的转变与机遇，代表积极的变化与进展。",
                    "reversed": "表示意外的阻碍或反复，需灵活应对变化，抓住新机会。"
                }
            },
            {
                "name": "正义",
                "name_english": "Justice",
                "image_file": "justice",
                "symbol": "XI",
                "title": ["正", "义"],
                "keywords": ["公正", "均衡", "责任"],
                "annotations": {
                    "normal": "代表公正与责任，强调平衡与公平决策的重要性。",
                    "reversed": "表示偏见或失衡，需重新审视判断，寻求更公正的解决方案。"
                }
            },
            {
                "name": "倒吊人",
                "name_english": "The Hanged Man",
                "image_file": "hanged-man",
                "symbol": "XII",
                "title": ["倒", "吊"],
                "keywords": ["牺牲", "等待", "换位思考", "以退为进"],
                "annotations": {
                    "normal": "象征牺牲与等待，鼓励通过换位思考获得新的视角与成长。",
                    "reversed": "表示消极被动，需主动调整策略，避免不必要的牺牲。"
                }
            },
            {
                "name": "死神",
                "name_english": "Death",
                "image_file": "death",
                "symbol": "XIII",
                "title": ["死", "亡"],
                "keywords": ["结束", "转变", "新生"],
                "annotations": {
                    "normal": "代表结束与转变，象征旧事物的消亡带来新生的可能。",
                    "reversed": "表示抗拒改变，需接受结束以迎接新的开始。"
                }
            },
            {
                "name": "节制",
                "name_english": "Temperance",
                "image_file": "temperance",
                "symbol": "XIV",
                "title": ["节", "制"],
                "keywords": ["协调", "配合", "节制", "净化", "治疗"],
                "annotations": {
                    "normal": "象征协调与节制，强调平衡与内在净化的重要性。",
                    "reversed": "表示失衡或过度，需重新调整节奏，恢复内在和谐。"
                }
            },
            {
                "name": "魔鬼",
                "name_english": "The Devil",
                "image_file": "devil",
                "symbol": "XV",
                "title": ["恶", "魔"],
                "keywords": ["欲望", "束缚", "沉溺", "物质"],
                "annotations": {
                    "normal": "代表欲望与物质束缚，警示过度沉溺于感官享受。",
                    "reversed": "表示摆脱束缚，开始追求更高层次的自由与精神成长。"
                }
            },
            {
                "name": "高塔",
                "name_english": "The Tower",
                "image_file": "tower",
                "symbol": "XVI",
                "title": ["高", "塔"],
                "keywords": ["骤变", "灾难", "破坏", "意外"],
                "annotations": {
                    "normal": "象征突如其来的剧变与破坏，代表打破旧有结构的必要性。",
                    "reversed": "表示避免灾难，需提前识别潜在风险，做好准备。"
                }
            },
            {
                "name": "星辰",
                "name_english": "The Stars",
                "image_file": "stars",
                "symbol": "XVII",
                "title": ["星", "辰"],
                "keywords": ["希望", "祝福"],
                "annotations": {
                    "normal": "代表希望与祝福，象征灵性指引与积极的未来。",
                    "reversed": "表示缺乏希望，需重新点燃信心，寻找内在力量。"
                }
            },
            {
                "name": "月亮",
                "name_english": "The Moon",
                "image_file": "moon",
                "symbol": "XVIII",
                "title": ["月", "亮"],
                "keywords": ["不安", "多变", "忧郁", "刻薄"],
                "annotations": {
                    "normal": "象征不安与多变，提醒警惕直觉与隐藏的恐惧。",
                    "reversed": "表示情绪稳定，能清晰应对变化，摆脱迷惑。"
                }
            },
            {
                "name": "太阳",
                "name_english": "The Sun",
                "image_file": "sun",
                "symbol": "XIX",
                "title": ["太", "阳"],
                "keywords": ["成功", "自由", "喜悦", "阳光"],
                "annotations": {
                    "normal": "代表成功与喜悦，象征光明与积极的成就。",
                    "reversed": "表示短暂的挫折，需重拾信心，继续前行。"
                }
            },
            {
                "name": "审判",
                "name_english": "Judgement",
                "image_file": "judgement",
                "symbol": "XX",
                "title": ["审", "判"],
                "keywords": ["复活", "觉醒", "回忆"],
                "annotations": {
                    "normal": "象征觉醒与复活，代表从过去中汲取教训，开启新阶段。",
                    "reversed": "表示拒绝改变，需正视过去，主动寻求转变。"
                }
            },
            {
                "name": "世界",
                "name_english": "The World",
                "image_file": "world",
                "symbol": "XXI",
                "title": ["世", "界"],
                "keywords": ["整合", "成就", "投入", "实现", "满足"],
                "annotations": {
                    "normal": "代表整合与成就，象征圆满的实现与满足。",
                    "reversed": "表示未完成的状态，需继续努力，达成目标。"
                }
            }
        ]
    },
    {
        "name": "权杖",
        "folder": "wands",
        "cards": [
            {
                "name": "权杖王牌",
                "name_english": "Ace of Wands",
                "image_file": "ace-wands",
                "symbol": "△",
                "title": ["权", "杖"],
                "keywords": ["新的机会", "灵感", "创意", "能量的开始"],
                "annotations": {
                    "normal": "象征新的机会与灵感，代表创意能量的开始，鼓励积极行动。",
                    "reversed": "表示机会未把握，创意受阻，需重新激发内在动力。"
                }
            },
            {
                "name": "权杖二",
                "name_english": "Two of Wands",
                "image_file": "two-wands",
                "symbol": "△",
                "title": ["权", "杖"],
                "keywords": ["选择", "决策", "前景", "合作"],
                "annotations": {
                    "normal": "代表选择与决策，强调合作与未来前景的规划。",
                    "reversed": "表示犹豫不决，合作受阻，需明确目标，果断行动。"
                }
            },
            {
                "name": "权杖三",
                "name_english": "Three of Wands",
                "image_file": "three-wands",
                "symbol": "△",
                "title": ["权", "杖"],
                "keywords": ["展望未来", "计划", "远见", "发展"],
                "annotations": {
                    "normal": "象征远见与计划，代表积极发展与未来展望。",
                    "reversed": "表示计划不周，发展受阻，需调整策略，重新规划。"
                }
            },
            {
                "name": "权杖四",
                "name_english": "Four of Wands",
                "image_file": "four-wands",
                "symbol": "△",
                "title": ["权", "杖"],
                "keywords": ["庆祝", "家庭", "和谐", "庆典"],
                "annotations": {
                    "normal": "代表家庭和谐与庆祝，象征稳定与和谐的氛围。",
                    "reversed": "表示家庭不和，缺乏庆祝，需加强沟通与互动。"
                }
            },
            {
                "name": "权杖五",
                "name_english": "Five of Wands",
                "image_file": "five-wands",
                "symbol": "△",
                "title": ["权", "杖"],
                "keywords": ["竞争", "冲突", "竞争激烈", "混乱"],
                "annotations": {
                    "normal": "象征竞争与冲突，提醒注意冲突中的策略与平衡。",
                    "reversed": "表示冲突减少，竞争缓和，需维持和谐关系。"
                }
            },
            {
                "name": "权杖六",
                "name_english": "Six of Wands",
                "image_file": "six-wands",
                "symbol": "△",
                "title": ["权", "杖"],
                "keywords": ["胜利", "荣誉", "成功", "公众认可"],
                "annotations": {
                    "normal": "代表胜利与成功，象征公众认可与成就。",
                    "reversed": "表示失败或缺乏认可，需反思策略，重新努力。"
                }
            },
            {
                "name": "权杖七",
                "name_english": "Seven of Wands",
                "image_file": "seven-wands",
                "symbol": "△",
                "title": ["权", "杖"],
                "keywords": ["防御", "竞争", "坚守立场", "自我保护"],
                "annotations": {
                    "normal": "象征防御与坚守，代表在竞争中保持立场。",
                    "reversed": "表示过度防御，需开放心态，减少冲突。"
                }
            },
            {
                "name": "权杖八",
                "name_english": "Eight of Wands",
                "image_file": "eight-wands",
                "symbol": "△",
                "title": ["权", "杖"],
                "keywords": ["迅速", "变化", "行动", "消息"],
                "annotations": {
                    "normal": "代表迅速行动与变化，象征快速传递信息与进展。",
                    "reversed": "表示行动迟缓，变化受阻，需加快节奏。"
                }
            },
            {
                "name": "权杖九",
                "name_english": "Nine of Wands",
                "image_file": "nine-wands",
                "symbol": "△",
                "title": ["权", "杖"],
                "keywords": ["坚韧", "保卫", "毅力", "战胜困难"],
                "annotations": {
                    "normal": "象征坚韧与毅力，代表克服困难的坚持。",
                    "reversed": "表示疲惫无力，需休息调整，恢复力量。"
                }
            },
            {
                "name": "权杖十",
                "name_english": "Ten of Wands",
                "image_file": "ten-wands",
                "symbol": "△",
                "title": ["权", "杖"],
                "keywords": ["负担过重", "努力", "责任", "压力"],
                "annotations": {
                    "normal": "代表负担与责任，象征努力付出与压力。",
                    "reversed": "表示压力过大，需减轻负担，寻求平衡。"
                }
            },
            {
                "name": "权杖侍从",
                "name_english": "Page of Wands",
                "image_file": "page-wands",
                "symbol": "△",
                "title": ["权", "杖"],
                "keywords": ["探索", "学习", "新消息", "创意"],
                "annotations": {
                    "normal": "象征探索与学习，代表新消息与创意的萌芽。",
                    "reversed": "表示缺乏探索，创意停滞，需主动寻找新机会。"
                }
            },
            {
                "name": "权杖骑士",
                "name_english": "Knight of Wands",
                "image_file": "knight-wands",
                "symbol": "△",
                "title": ["权", "杖"],
                "keywords": ["勇敢", "追求", "冒险", "热情"],
                "annotations": {
                    "normal": "代表勇敢追求与冒险，象征热情与行动力。",
                    "reversed": "表示冲动冒险，需谨慎规划，避免鲁莽。"
                }
            },
            {
                "name": "权杖皇后",
                "name_english": "Queen of Wands",
                "image_file": "queen-wands",
                "symbol": "△",
                "title": ["权", "杖"],
                "keywords": ["魅力", "热情", "自信", "创造性"],
                "annotations": {
                    "normal": "象征魅力与热情，代表自信与创造力。",
                    "reversed": "表示缺乏自信，热情减退，需重拾内在力量。"
                }
            },
            {
                "name": "权杖国王",
                "name_english": "King of Wands",
                "image_file": "king-wands",
                "symbol": "△",
                "title": ["权", "杖"],
                "keywords": ["领导力", "创造力", "决断力", "激情"],
                "annotations": {
                    "normal": "代表领导力与创造力，象征决断力与激情。",
                    "reversed": "表示领导力不足，决策犹豫，需恢复自信与果断。"
                }
            }
        ]
    },
    {
        "name": "圣杯",
        "folder": "cups",
        "cards": [
            {
                "name": "圣杯王牌",
                "name_english": "Ace of Cups",
                "image_file": "ace-cups",
                "symbol": "○",
                "title": ["圣", "杯"],
                "keywords": ["爱情", "感情", "新感情", "情感的开始"],
                "annotations": {
                    "normal": "象征爱情与情感的开始，代表新感情的萌芽与真诚。",
                    "reversed": "表示情感受阻，新感情未开始，需开放心扉。"
                }
            },
            {
                "name": "圣杯二",
                "name_english": "Two of Cups",
                "image_file": "two-cups",
                "symbol": "○",
                "title": ["圣", "杯"],
                "keywords": ["伙伴关系", "合作", "互动", "感情联结"],
                "annotations": {
                    "normal": "代表伙伴关系与合作，象征情感联结与互动。",
                    "reversed": "表示关系疏远，合作受阻，需加强沟通。"
                }
            },
            {
                "name": "圣杯三",
                "name_english": "Three of Cups",
                "image_file": "three-cups",
                "symbol": "○",
                "title": ["圣", "杯"],
                "keywords": ["庆祝", "社交", "欢乐", "友情"],
                "annotations": {
                    "normal": "象征社交与欢乐，代表友情与庆祝的氛围。",
                    "reversed": "表示社交孤立，缺乏欢乐，需主动参与。"
                }
            },
            {
                "name": "圣杯四",
                "name_english": "Four of Cups",
                "image_file": "four-cups",
                "symbol": "○",
                "title": ["圣", "杯"],
                "keywords": ["冷漠", "疏远", "不满", "反思"],
                "annotations": {
                    "normal": "代表冷漠与反思，象征情感疏离与内心审视。",
                    "reversed": "表示情感活跃，需避免过度冷漠，建立联结。"
                }
            },
            {
                "name": "圣杯五",
                "name_english": "Five of Cups",
                "image_file": "five-cups",
                "symbol": "○",
                "title": ["圣", "杯"],
                "keywords": ["失望", "悲伤", "遗憾", "放下"],
                "annotations": {
                    "normal": "象征失望与悲伤，提醒放下遗憾，向前看。",
                    "reversed": "表示走出悲伤，接受现实，开始新阶段。"
                }
            },
            {
                "name": "圣杯六",
                "name_english": "Six of Cups",
                "image_file": "six-cups",
                "symbol": "○",
                "title": ["圣", "杯"],
                "keywords": ["回忆", "童年", "怀旧", "友情"],
                "annotations": {
                    "normal": "代表回忆与怀旧，象征童年友谊与情感连接。",
                    "reversed": "表示拒绝过去，需放下怀旧，关注当下。"
                }
            },
            {
                "name": "圣杯七",
                "name_english": "Seven of Cups",
                "image_file": "seven-cups",
                "symbol": "○",
                "title": ["圣", "杯"],
                "keywords": ["幻想", "多样选择", "迷惘", "幻觉"],
                "annotations": {
                    "normal": "象征幻想与多样选择，提醒辨别现实与幻觉。",
                    "reversed": "表示迷惘减少，选择清晰，需果断决策。"
                }
            },
            {
                "name": "圣杯八",
                "name_english": "Eight of Cups",
                "image_file": "eight-cups",
                "symbol": "○",
                "title": ["圣", "杯"],
                "keywords": ["离开", "追求更多", "内在探索", "放手"],
                "annotations": {
                    "normal": "代表离开与追求，象征内在探索与放手。",
                    "reversed": "表示犹豫不决，需果断离开，追求新方向。"
                }
            },
            {
                "name": "圣杯九",
                "name_english": "Nine of Cups",
                "image_file": "nine-cups",
                "symbol": "○",
                "title": ["圣", "杯"],
                "keywords": ["满足", "心愿成真", "幸福", "愿望达成"],
                "annotations": {
                    "normal": "象征满足与幸福，代表愿望达成的喜悦。",
                    "reversed": "表示愿望未达成，需调整目标，继续努力。"
                }
            },
            {
                "name": "圣杯十",
                "name_english": "Ten of Cups",
                "image_file": "ten-cups",
                "symbol": "○",
                "title": ["圣", "杯"],
                "keywords": ["家庭幸福", "和谐", "满足感", "完整"],
                "annotations": {
                    "normal": "代表家庭幸福与和谐，象征完整与满足。",
                    "reversed": "表示家庭不和谐，需修复关系，重建和谐。"
                }
            },
            {
                "name": "圣杯侍从",
                "name_english": "Page of Cups",
                "image_file": "page-cups",
                "symbol": "○",
                "title": ["圣", "杯"],
                "keywords": ["情感新闻", "灵感", "情感表达", "创意"],
                "annotations": {
                    "normal": "象征情感新闻与灵感，代表情感表达的创意。",
                    "reversed": "表示情感表达受阻，需开放心扉，表达真实感受。"
                }
            },
            {
                "name": "圣杯骑士",
                "name_english": "Knight of Cups",
                "image_file": "knight-cups",
                "symbol": "○",
                "title": ["圣", "杯"],
                "keywords": ["浪漫", "感性", "幻想", "献身"],
                "annotations": {
                    "normal": "代表浪漫与感性，象征献身与幻想。",
                    "reversed": "表示幻想破灭，需回归现实，理性处理感情。"
                }
            },
            {
                "name": "圣杯皇后",
                "name_english": "Queen of Cups",
                "image_file": "queen-cups",
                "symbol": "○",
                "title": ["圣", "杯"],
                "keywords": ["直觉", "情感理解", "同情心", "感受力"],
                "annotations": {
                    "normal": "象征直觉与同情心，代表情感理解与感受力。",
                    "reversed": "表示情感麻木，需重新培养同理心，加强感受。"
                }
            },
            {
                "name": "圣杯国王",
                "name_english": "King of Cups",
                "image_file": "king-cups",
                "symbol": "○",
                "title": ["圣", "杯"],
                "keywords": ["感情成熟", "冷静", "理智", "同情心"],
                "annotations": {
                    "normal": "代表感情成熟与理智，象征冷静与同情心。",
                    "reversed": "表示感情不成熟，需提升理智，避免冲动。"
                }
            }
        ]
    },
    {
        "name": "宝剑",
        "folder": "swords",
        "cards": [
            {
                "name": "宝剑王牌",
                "name_english": "Ace of Swords",
                "image_file": "ace-swords",
                "symbol": "+",
                "title": ["宝", "剑"],
                "keywords": ["清晰思考", "洞察力", "真相", "新思维"],
                "annotations": {
                    "normal": "象征清晰思考与洞察力，代表真相与新思维的开始。",
                    "reversed": "表示思维混乱，真相被掩盖，需冷静分析。"
                }
            },
            {
                "name": "宝剑二",
                "name_english": "Two of Swords",
                "image_file": "two-swords",
                "symbol": "+",
                "title": ["宝", "剑"],
                "keywords": ["犹豫", "权衡", "决策", "选择"],
                "annotations": {
                    "normal": "代表犹豫与权衡，象征决策前的思考。",
                    "reversed": "表示决策果断，但需注意选择的后果。"
                }
            },
            {
                "name": "宝剑三",
                "name_english": "Three of Swords",
                "image_file": "three-swords",
                "symbol": "+",
                "title": ["宝", "剑"],
                "keywords": ["心痛", "失望", "痛苦", "分离"],
                "annotations": {
                    "normal": "象征心痛与分离，提醒面对情感的痛苦。",
                    "reversed": "表示走出痛苦，开始愈合，接受现实。"
                }
            },
            {
                "name": "宝剑四",
                "name_english": "Four of Swords",
                "image_file": "four-swords",
                "symbol": "+",
                "title": ["宝", "剑"],
                "keywords": ["休息", "恢复", "内在平静", "冥想"],
                "annotations": {
                    "normal": "代表休息与恢复，象征内在平静与冥想。",
                    "reversed": "表示无法休息，需主动寻求恢复。"
                }
            },
            {
                "name": "宝剑五",
                "name_english": "Five of Swords",
                "image_file": "five-swords",
                "symbol": "+",
                "title": ["宝", "剑"],
                "keywords": ["失败", "争议", "失落", "胜者与失败者"],
                "annotations": {
                    "normal": "象征失败与争议，代表失落与竞争结果。",
                    "reversed": "表示避免失败，需调整策略，重新竞争。"
                }
            },
            {
                "name": "宝剑六",
                "name_english": "Six of Swords",
                "image_file": "six-swords",
                "symbol": "+",
                "title": ["宝", "剑"],
                "keywords": ["离开困境", "平静过渡", "旅程", "转变"],
                "annotations": {
                    "normal": "代表离开困境，象征平静过渡与转变。",
                    "reversed": "表示仍在困境中，需继续前行，寻找出路。"
                }
            },
            {
                "name": "宝剑七",
                "name_english": "Seven of Swords",
                "image_file": "seven-swords",
                "symbol": "+",
                "title": ["宝", "剑"],
                "keywords": ["欺骗", "窃取", "隐秘行动", "防御"],
                "annotations": {
                    "normal": "象征欺骗与隐秘行动，提醒警惕潜在的背叛。",
                    "reversed": "表示诚实面对，避免欺骗，建立信任。"
                }
            },
            {
                "name": "宝剑八",
                "name_english": "Eight of Swords",
                "image_file": "eight-swords",
                "symbol": "+",
                "title": ["宝", "剑"],
                "keywords": ["束缚", "困惑", "无助", "限制"],
                "annotations": {
                    "normal": "代表束缚与困惑，象征无助与限制。",
                    "reversed": "表示摆脱束缚，获得清晰，重获自由。"
                }
            },
            {
                "name": "宝剑九",
                "name_english": "Nine of Swords",
                "image_file": "nine-swords",
                "symbol": "+",
                "title": ["宝", "剑"],
                "keywords": ["焦虑", "恐惧", "噩梦", "内心痛苦"],
                "annotations": {
                    "normal": "象征焦虑与恐惧，提醒面对内心痛苦。",
                    "reversed": "表示焦虑减轻，内心平静，走出噩梦。"
                }
            },
            {
                "name": "宝剑十",
                "name_english": "Ten of Swords",
                "image_file": "ten-swords",
                "symbol": "+",
                "title": ["宝", "剑"],
                "keywords": ["背叛", "结束", "彻底失败", "重大改变"],
                "annotations": {
                    "normal": "代表背叛与彻底失败，象征重大改变的开始。",
                    "reversed": "表示避免背叛，结束负面状态，迎接新开始。"
                }
            },
            {
                "name": "宝剑侍从",
                "name_english": "Page of Swords",
                "image_file": "page-swords",
                "symbol": "+",
                "title": ["宝", "剑"],
                "keywords": ["观察", "学习", "好奇心", "警觉"],
                "annotations": {
                    "normal": "象征观察与学习，代表好奇心与警觉。",
                    "reversed": "表示缺乏警觉，需提高观察力，避免疏忽。"
                }
            },
            {
                "name": "宝剑骑士",
                "name_english": "Knight of Swords",
                "image_file": "knight-swords",
                "symbol": "+",
                "title": ["宝", "剑"],
                "keywords": ["急躁", "行动", "冲突", "勇敢"],
                "annotations": {
                    "normal": "代表急躁与行动，象征冲突中的勇敢。",
                    "reversed": "表示行动过猛，需冷静处理，避免冲突。"
                }
            },
            {
                "name": "宝剑皇后",
                "name_english": "Queen of Swords",
                "image_file": "queen-swords",
                "symbol": "+",
                "title": ["宝", "剑"],
                "keywords": ["聪明", "判断力", "独立", "坚韧"],
                "annotations": {
                    "normal": "象征聪明与判断力，代表独立与坚韧。",
                    "reversed": "表示判断失误，需恢复理性，保持独立。"
                }
            },
            {
                "name": "宝剑国王",
                "name_english": "King of Swords",
                "image_file": "king-swords",
                "symbol": "+",
                "title": ["宝", "剑"],
                "keywords": ["权威", "公正", "冷静", "思考"],
                "annotations": {
                    "normal": "代表权威与公正，象征冷静思考与决策。",
                    "reversed": "表示不公正，需恢复冷静，公平处理。"
                }
            }
        ]
    },
    {
        "name": "星币",
        "folder": "pentacles",
        "cards": [
            {
                "name": "星币王牌",
                "name_english": "Ace of Pentacles",
                "image_file": "ace-pentacles",
                "symbol": "◇",
                "title": ["星", "币"],
                "keywords": ["新的财富", "机会", "稳定", "物质的开始"],
                "annotations": {
                    "normal": "象征新的财富与机会，代表物质开始的稳定。",
                    "reversed": "表示财富机会未把握，需谨慎规划。"
                }
            },
            {
                "name": "星币二",
                "name_english": "Two of Pentacles",
                "image_file": "two-pentacles",
                "symbol": "◇",
                "title": ["星", "币"],
                "keywords": ["平衡", "多重任务", "变化", "适应"],
                "annotations": {
                    "normal": "代表平衡与适应，象征多重任务中的调整。",
                    "reversed": "表示失衡，需重新调整，恢复平衡。"
                }
            },
            {
                "name": "星币三",
                "name_english": "Three of Pentacles",
                "image_file": "three-pentacles",
                "symbol": "◇",
                "title": ["星", "币"],
                "keywords": ["团队合作", "建设", "合作", "成就"],
                "annotations": {
                    "normal": "象征团队合作与成就，代表共同建设。",
                    "reversed": "表示合作受阻，需加强沟通，达成目标。"
                }
            },
            {
                "name": "星币四",
                "name_english": "Four of Pentacles",
                "image_file": "four-pentacles",
                "symbol": "◇",
                "title": ["星", "币"],
                "keywords": ["财务稳定", "保守", "控制", "财富守护"],
                "annotations": {
                    "normal": "代表财务稳定与保守，象征财富守护。",
                    "reversed": "表示过度保守，需适度冒险，寻求增长。"
                }
            },
            {
                "name": "星币五",
                "name_english": "Five of Pentacles",
                "image_file": "five-pentacles",
                "symbol": "◇",
                "title": ["星", "币"],
                "keywords": ["贫困", "困难", "孤独", "寻求支持"],
                "annotations": {
                    "normal": "象征贫困与困难，提醒寻求支持与互助。",
                    "reversed": "表示摆脱困难，需继续寻求支持。"
                }
            },
            {
                "name": "星币六",
                "name_english": "Six of Pentacles",
                "image_file": "six-pentacles",
                "symbol": "◇",
                "title": ["星", "币"],
                "keywords": ["慈善", "分享", "公平", "给予与接受"],
                "annotations": {
                    "normal": "代表慈善与分享，象征公平给予与接受。",
                    "reversed": "表示吝啬，需学会分享，建立公平关系。"
                }
            },
            {
                "name": "星币七",
                "name_english": "Seven of Pentacles",
                "image_file": "seven-pentacles",
                "symbol": "◇",
                "title": ["星", "币"],
                "keywords": ["耐心等待", "投资", "收获", "回报"],
                "annotations": {
                    "normal": "象征耐心等待与长期投资，提醒成果需要时间积累才能显现。",
                    "reversed": "表示急于求成或回报未达预期，需重新评估投入与策略。"
                }
            },
            {
                "name": "星币八",
                "name_english": "Eight of Pentacles",
                "image_file": "eight-pentacles",
                "symbol": "◇",
                "title": ["星", "币"],
                "keywords": ["专注", "技艺", "努力", "精益求精"],
                "annotations": {
                    "normal": "代表专注与精益求精，象征通过持续努力提升技艺。",
                    "reversed": "表示缺乏动力或敷衍了事，需重拾热情，专注细节。"
                }
            },
            {
                "name": "星币九",
                "name_english": "Nine of Pentacles",
                "image_file": "nine-pentacles",
                "symbol": "◇",
                "title": ["星", "币"],
                "keywords": ["独立", "自给自足", "享受成果", "富足"],
                "annotations": {
                    "normal": "象征独立与富足，代表享受辛勤劳动带来的成果。",
                    "reversed": "表示依赖他人或成果被忽视，需重建自信与自主性。"
                }
            },
            {
                "name": "星币十",
                "name_english": "Ten of Pentacles",
                "image_file": "ten-pentacles",
                "symbol": "◇",
                "title": ["星", "币"],
                "keywords": ["家庭财富", "传承", "稳定", "长期安全"],
                "annotations": {
                    "normal": "代表家庭财富与长期安全，象征物质与精神的双重传承。",
                    "reversed": "表示家庭财务紧张或传承断裂，需修复关系、规划未来。"
                }
            },
            {
                "name": "星币侍从",
                "name_english": "Page of Pentacles",
                "image_file": "page-pentacles",
                "symbol": "◇",
                "title": ["星", "币"],
                "keywords": ["学习理财", "新机会", "务实", "勤奋"],
                "annotations": {
                    "normal": "象征务实的学习态度与新的财务机会，鼓励脚踏实地地成长。",
                    "reversed": "表示懒惰或错失良机，需提高责任感，把握现实机遇。"
                }
            },
            {
                "name": "星币骑士",
                "name_english": "Knight of Pentacles",
                "image_file": "knight-pentacles",
                "symbol": "◇",
                "title": ["星", "币"],
                "keywords": ["稳重", "可靠", "坚持", "缓慢但坚定"],
                "annotations": {
                    "normal": "代表稳重可靠与坚持不懈，象征缓慢但扎实的进步。",
                    "reversed": "表示过于保守或行动迟缓，需适度加快节奏，避免停滞。"
                }
            },
            {
                "name": "星币皇后",
                "name_english": "Queen of Pentacles",
                "image_file": "queen-pentacles",
                "symbol": "◇",
                "title": ["星", "币"],
                "keywords": ["务实", "关怀", "富足", "家庭导向"],
                "annotations": {
                    "normal": "象征务实与关怀，代表在富足中照顾家庭与他人需求。",
                    "reversed": "表示过度关注物质而忽略情感，需平衡实用与温情。"
                }
            },
            {
                "name": "星币国王",
                "name_english": "King of Pentacles",
                "image_file": "king-pentacles",
                "symbol": "◇",
                "title": ["星", "币"],
                "keywords": ["成功", "财富", "领导力", "稳健"],
                "annotations": {
                    "normal": "代表物质成功与稳健领导力，象征通过智慧与经验积累财富。",
                    "reversed": "表示贪婪或固守旧模式，需保持开放，兼顾他人利益。"
                }
            }
        ]
    }
];