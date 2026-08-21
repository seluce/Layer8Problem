<!--
  The mail window.

  Renders the whole overlay including the header fields, the body and the reply
  buttons. The engine only fills state.email and flips `open`.

  The countdown bar is a CSS transition rather than a timer: it is set to 100%
  without a transition, then to 0% with one, so the browser animates it. The
  engine's own timeout decides what actually happens when it runs out — the bar
  is only the visible half of that.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';

    import { t } from '../i18n/i18n.svelte.js';
    const mail = $derived(state.email ?? {});
    const paragraphs = $derived((mail.body ?? '').split('\n'));

    const pad = (n) => String(n).padStart(2, '0');
    const timestamp = $derived(`${pad(Math.floor(state.time / 60))}:${pad(state.time % 60)}`);

    const initial = $derived((mail.sender ?? '?').charAt(0).toUpperCase());

    // Who gets dragged into the thread. Pure flavour, keyed off mail.senderId.
    //
    // This used to match the sender PROSE (/buchhaltung|elster/, /sicherheit/),
    // which worked for exactly as long as data_emails.js was German: the day it
    // was translated every mail would have fallen through to the default, with
    // no error and no failing test. Hence senderId in the data - an identifier
    // survives translation, a display string does not.
    //
    // Senders not listed here get the default distribution list. The list is
    // per SENDER, not per department: 'Betriebsrat', 'Betriebsrat (Uwe)' and
    // 'Betriebsrat (Umfrage)' are three senders and stay three ids.
    //
    // This table reproduces what the patterns did, mail for mail, INCLUDING
    // three results nobody chose:
    //   - hr_feelgood_management and office_management land on the boss because
    //     /chef|management/ came first and matched the word "Management"
    //   - system_notification lands on HR because "BenacHRichtigung" contains
    //     the letters of /hr/
    //   - `boss` (Dr. Wichtig, 10 mails) gets the DEFAULT list: "Dr. Wichtig"
    //     matches no pattern, least of all /chef/
    // Changing any of them is a player-visible edit to the CC line and belongs
    // in its own decision, not in a rebuild that has to prove it changed
    // nothing. Listed in UEBERGABE.md.
    // i18n-uses: email.cc.boss, email.cc.kevin, email.cc.marketing
    // i18n-uses: email.cc.accounting, email.cc.hr, email.cc.security
    const CC_BY_SENDER = {
        hr_feelgood_management: 'email.cc.boss',
        office_management:      'email.cc.boss',

        kevin_apprentice:       'email.cc.kevin',
        kevin_private:          'email.cc.kevin',

        chantal_marketing:      'email.cc.marketing',
        chantal_private:        'email.cc.marketing',

        elster_accounts:        'email.cc.accounting',
        wuttke_accounts:        'email.cc.accounting',
        sandra_accounts:        'email.cc.accounting',

        hr_sabine:              'email.cc.hr',
        hr_automated:           'email.cc.hr',
        hr_system:              'email.cc.hr',
        hr_survey_bot:          'email.cc.hr',
        hr_compliance_bot:      'email.cc.hr',
        hr_department:          'email.cc.hr',
        staff_development:      'email.cc.hr',
        system_notification:    'email.cc.hr',   // inherited accident, see above

        security_office:        'email.cc.security',
        security_guards:        'email.cc.security',

        prince_scam:            null   // scammers rarely CC anyone
    };
    const cc = $derived(
        (() => {
            if (!(mail.senderId in CC_BY_SENDER)) return t('email.cc.default');
            const key = CC_BY_SENDER[mail.senderId];
            return key ? t(key) : '';
        })()
    );

    const hotkey = (index) => {
        if (!state.showHotkeys) return '';
        const key = [state.keyBinds.opt1, state.keyBinds.opt2, state.keyBinds.opt3, '4', '5', '6'][index] ?? '';
        return key.replace(/^Arrow/, '').toUpperCase();
    };

    const options = $derived(
        (mail.opts ?? []).map((opt, index) => ({ opt, index, isDelete: !!opt.ignoreEmail, key: hotkey(index) }))
    );

    function choose(e, opt) {
        e.stopPropagation();
        e.preventDefault();
        engine.resolveEmail(opt, false);
    }
</script>

<!--
  Only rendered while the window is open. Otherwise the countdown animation
  would run behind a hidden overlay and be half gone by the time it appears.
-->
{#if state.isEmailOpen}
<div class="w-full max-w-lg bg-slate-900 border border-slate-600 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col font-sans animate-pop-in">

    <div class="h-1 w-full bg-slate-800 rounded-t-lg overflow-hidden shrink-0">
        <!--
          Keyed on the mail id so Svelte replaces the element for every new
          mail. Reusing it would keep the running transition and the bar would
          not restart.
        -->
        {#key mail.id ?? mail.subj}
            <!-- Duration from the engine's own constant, so the bar and the
                 timeout can never drift apart again. -->
            <div class="h-full bg-blue-500 email-timer-bar"
                 style="animation-duration: {engine.EMAIL_DURATION_MS}ms"></div>
        {/key}
    </div>

    <div class="p-4 border-b border-slate-700 flex gap-3 items-start shrink-0">
        <div class="w-10 h-10 shrink-0 rounded-full bg-blue-900/50 border border-blue-700 flex items-center justify-center text-blue-300 font-bold text-lg">
            {initial}
        </div>
        <div class="flex-1 min-w-0">
            <div class="flex justify-between items-baseline gap-2">
                <span class="font-bold text-slate-100 truncate">{mail.sender}</span>
                <span class="text-[10px] text-slate-500 shrink-0">{timestamp}</span>
            </div>
            <div class="text-sm text-slate-300 truncate">{mail.subj}</div>
            {#if cc}
                <div class="flex gap-2 text-[10px] mt-1">
                    <span class="w-6 text-slate-500 font-bold text-right">{t('email.cc')}</span>
                    <span class="text-slate-500">{cc}</span>
                </div>
            {/if}
        </div>
    </div>

    <div class="p-4 text-sm text-slate-300 leading-relaxed overflow-y-auto grow">
        {#each paragraphs as line, i}{#if i > 0}<br>{/if}{line}{/each}
    </div>

    <!-- Keeps the id: the keyboard shortcuts in engine.js look up the reply
         buttons through it. -->
    <div id="email-actions" class="p-3 border-t border-slate-700 space-y-2 shrink-0">
        {#each options as o (o.index)}
            <button type="button"
                    onclick={(e) => choose(e, o.opt)}
                    class="w-full text-left px-3 py-2 bg-slate-800 border border-slate-700 rounded-sm text-xs font-medium transition-colors duration-75 flex justify-between items-center group
                           {o.isDelete
                             ? 'hover:bg-red-950/30 hover:border-red-500/50 text-slate-400 hover:text-red-400'
                             : 'hover:bg-blue-900/30 hover:border-blue-500/50 text-slate-300 hover:text-blue-300'}">
                <div class="flex items-center flex-1 mr-2">
                    <span class="mr-2 transition-colors duration-75 text-base shrink-0
                                 {o.isDelete ? 'text-slate-600 group-hover:text-red-500' : 'text-slate-500 group-hover:text-blue-400'}">
                        {#if o.isDelete}
                            <img src="assets/img/ui/ui_trash.webp" alt={t('email.delete')}
                                 width="18" height="18" class="w-5 h-5 select-none"
                                 onerror={(e) => e.currentTarget.outerHTML = '🗑️'}>
                        {:else}➥{/if}
                    </span>
                    <span class="wrap-break-word leading-tight py-1">{o.opt.t}</span>
                </div>
                <div class="shrink-0 flex items-center h-full">
                    {#if o.key}
                        <kbd class="key-hint shrink-0 {o.isDelete ? 'group-hover:text-red-400' : 'group-hover:text-blue-400'}">{o.key}</kbd>
                    {/if}
                </div>
            </button>
        {/each}
    </div>
</div>
{/if}

<style>
    /* Runs once on mount. The {#key} block above recreates the element for each
       new mail, which restarts the animation without any JavaScript. The
       DURATION is deliberately absent here - it comes inline from
       engine.EMAIL_DURATION_MS, the same constant the engine's timeout uses. */
    .email-timer-bar {
        width: 100%;
        animation: email-countdown linear forwards;
    }

    @keyframes email-countdown {
        from { width: 100%; }
        to   { width: 0%; }
    }
</style>
