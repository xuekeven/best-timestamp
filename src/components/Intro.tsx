import React from 'react';

interface IntroProps {
  lang: string;
  open: boolean;
}

const Intro: React.FC<IntroProps> = ({ lang, open }) => (
  open ? (
    <div style={{ fontSize: 16, color: '#222', lineHeight: 1.8 }}>
      {lang === 'zh'
        ? (
          <>
            <ol style={{paddingLeft:20}}>
              <li><b>什么是 Unix 时间戳？</b><br/>Unix 时间戳（Unix timestamp），又称 POSIX 时间，是一种以整数表示时间的方法。它定义为自 1970 年 1 月 1 日 00:00:00 UTC（协调世界时）以来经过的总秒数（不包括闰秒）。<br/>这种表示方式广泛应用于操作系统、数据库、编程语言和互联网服务中，便于时间的存储、比较和计算。</li>
              <li><b>为什么 Unix 时间戳以 1970 年 1 月 1 日为起点？</b><br/>1970 年 1 月 1 日 00:00:00 UTC 被称为“Unix 纪元”（Epoch），是 Unix 系统设计时选定的标准起点。所有的时间戳都是以这个时间为基准计算的。</li>
              <li><b>时间戳的单位是什么？为什么有 10 位、13 位、16 位、19 位？</b><br/>10 位：秒（最常见）<br/>13 位：毫秒<br/>16 位：微秒<br/>19 位：纳秒<br/>不同的编程语言和数据库可能采用不同的精度，使用时需注意单位。</li>
              <li><b>时间戳会溢出吗？</b><br/>32 位有符号整数的最大值为 2147483647（对应 2038-01-19 03:14:07 UTC），超过后会溢出，称为“2038 问题”。现代系统多已采用 64 位整数，足以表示数十亿年。</li>
              <li><b>时间戳如何与本地时间、时区转换？</b><br/>时间戳本身是 UTC 时间。转换为本地时间时，需根据本地时区进行调整。大多数编程语言和数据库都提供了相关的转换函数。</li>
              <li><b>时间戳有哪些常见用途？</b><br/>记录事件发生时间、定时任务、唯一 ID 生成、数据同步与比较、前后端数据交互等。</li>
              <li><b>为什么有的时间戳是负数？</b><br/>负数时间戳表示 1970 年 1 月 1 日之前的时间。例如 -1 表示 1969-12-31 23:59:59 UTC。</li>
              <li><b>如何将时间戳与日期互转？</b><br/>不同编程语言有不同的转换方法，详见本页面“多语言代码示例”区块。</li>
            </ol>
          </>
        ) : (
          <>
            <ol style={{paddingLeft:20}}>
              <li><b>What is a Unix Timestamp?</b><br/>The Unix timestamp (or POSIX time) is an integer representing the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC (excluding leap seconds).<br/>It is widely used in operating systems, databases, programming languages, and internet services for storing, comparing, and computing time.</li> 
              <li><b>Why does the Unix timestamp start from 1970-01-01?</b><br/>This date is called the Unix Epoch, chosen as the standard starting point for Unix systems.</li>
              <li><b>What are the units of a timestamp? Why are there 10, 13, 16, or 19 digits?</b><br/>10 digits: seconds (most common)<br/>13 digits: milliseconds<br/>16 digits: microseconds<br/>19 digits: nanoseconds<br/>Different languages and databases may use different precisions.</li>
              <li><b>Will the timestamp overflow? </b><br/>32-bit signed integers overflow at 2147483647 (2038-01-19 03:14:07 UTC). Modern systems use 64-bit integers, which are safe for billions of years.</li>
              <li><b>How to convert between timestamp and local time/timezone?</b><br/>Timestamps are in UTC. Conversion to local time requires timezone adjustment. Most languages/databases provide conversion functions.</li>
              <li><b>What are common uses of timestamps?</b><br/>Logging event times, scheduled tasks, unique ID generation, data synchronization and comparison, frontend-backend data exchange, etc.</li>
              <li><b>Why are some timestamps negative?</b><br/>Negative timestamps represent times before 1970-01-01 UTC.</li>
              <li><b>How to convert between timestamp and date?</b><br/>See the “Code Examples in Multiple Languages” section above.</li>
            </ol>
          </>
        )}
    </div>
  ) : null
);

export default Intro; 